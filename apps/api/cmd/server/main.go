package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/daiy0/movie-star/apps/api/internal/auth"
)

func main() {
	router := gin.Default()
	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	authRepo := auth.NewRepository()
	authService := auth.NewService(authRepo)
	authHandler := auth.NewHandler(authService)

	authGroup := router.Group("/api/v1/auth")
	authHandler.RegisterRoutes(authGroup)

	if err := router.Run(); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}
