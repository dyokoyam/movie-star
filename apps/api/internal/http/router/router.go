package router

import (
	"time"

	"github.com/dyokoyam/movie-star/apps/api/internal/config"
	"github.com/dyokoyam/movie-star/apps/api/internal/http/handler"
	"github.com/dyokoyam/movie-star/apps/api/internal/http/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.uber.org/zap"
)

// New configures and returns the HTTP router.
func New(cfg config.Config, log *zap.Logger, pool *pgxpool.Pool) *gin.Engine {
	if cfg.App.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(middleware.RequestID())
	router.Use(middleware.Logger(log))
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "X-Request-ID", "X-Client-Request-ID"},
		ExposeHeaders:    []string{"X-Request-ID"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/healthz", handler.Health(pool))

	v1 := router.Group("/api/v1")
	{
		v1.GET("/movies", handler.ListMovies())
	}

	return router
}
