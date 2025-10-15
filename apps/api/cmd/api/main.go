package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/dyokoyam/movie-star/apps/api/internal/config"
	"github.com/dyokoyam/movie-star/apps/api/internal/database"
	"github.com/dyokoyam/movie-star/apps/api/internal/logger"
	"github.com/dyokoyam/movie-star/apps/api/internal/server"
	"go.uber.org/zap"
)

func main() {
	cfg, err := config.Load(".env")
	if err != nil {
		panic(err)
	}

	log, err := logger.New(cfg.App.Env)
	if err != nil {
		panic(err)
	}
	defer log.Sync() //nolint:errcheck // nothing meaningful to do on sync failure

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	pool, err := database.NewPool(ctx, cfg.Database)
	if err != nil {
		log.Fatal("failed to connect to database", zap.Error(err))
	}
	defer pool.Close()

	srv := server.New(cfg, log, pool)

	errCh := make(chan error, 1)
	go func() {
		errCh <- srv.Run(ctx)
	}()

	select {
	case <-ctx.Done():
		log.Info("shutting down server")
	case err = <-errCh:
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatal("server exited with error", zap.Error(err))
		}
	}
}
