package handler

import (
	"context"
	"net/http"
	"time"

	"github.com/dyokoyam/movie-star/apps/api/internal/http/middleware"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Health returns HTTP handler that reports liveliness and database readiness.
func Health(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), 2*time.Second)
		defer cancel()

		status := http.StatusOK
		result := gin.H{
			"status":     "ok",
			"timestamp":  time.Now().UTC(),
			"request_id": middleware.RequestIDFromContext(c),
		}

		if pool != nil {
			if err := pool.Ping(ctx); err != nil {
				status = http.StatusServiceUnavailable
				result["status"] = "degraded"
				result["database"] = gin.H{
					"status": "unreachable",
					"error":  err.Error(),
				}
			} else {
				result["database"] = gin.H{"status": "connected"}
			}
		}

		c.JSON(status, result)
	}
}
