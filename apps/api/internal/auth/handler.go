package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) RegisterRoutes(router gin.IRoutes) {
	router.GET("/profile", h.currentProfile)
}

func (h *Handler) currentProfile(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"user": h.service.CurrentProfile(),
	})
}
