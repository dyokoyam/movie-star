package server

import (
	"context"
	"errors"
	"net/http"

	"github.com/dyokoyam/movie-star/apps/api/internal/config"
	"github.com/dyokoyam/movie-star/apps/api/internal/http/router"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.uber.org/zap"
)

// Server wraps the HTTP server lifecycle.
type Server struct {
	cfg        config.Config
	log        *zap.Logger
	httpServer *http.Server
}

// New creates a Server with sensible defaults.
func New(cfg config.Config, log *zap.Logger, pool *pgxpool.Pool) *Server {
	engine := router.New(cfg, log, pool)

	srv := &Server{
		cfg: cfg,
		log: log,
		httpServer: &http.Server{
			Addr:              cfg.Server.Address(),
			Handler:           engine,
			ReadTimeout:       cfg.Server.ReadTimeout,
			ReadHeaderTimeout: cfg.Server.ReadTimeout,
			WriteTimeout:      cfg.Server.WriteTimeout,
			IdleTimeout:       cfg.Server.IdleTimeout,
		},
	}

	return srv
}

// Run starts listening for HTTP requests and blocks until context cancellation or fatal error.
func (s *Server) Run(ctx context.Context) error {
	errCh := make(chan error, 1)

	go func() {
		s.log.Info("starting http server", zap.String("address", s.httpServer.Addr))
		if err := s.httpServer.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			errCh <- err
			return
		}
		errCh <- nil
	}()

	select {
	case <-ctx.Done():
		shutdownCtx, cancel := context.WithTimeout(context.Background(), s.cfg.Server.ShutdownTimeout)
		defer cancel()

		if err := s.httpServer.Shutdown(shutdownCtx); err != nil {
			s.log.Error("graceful shutdown failed", zap.Error(err))
			return err
		}

		s.log.Info("http server stopped")
		return nil
	case err := <-errCh:
		return err
	}
}
