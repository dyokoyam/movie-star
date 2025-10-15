package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const (
	requestIDKey     = "request_id"
	requestIDHeader  = "X-Request-ID"
	clientRequestKey = "X-Client-Request-ID"
)

// RequestID ensures every request carries a correlation identifier that is accessible in handlers.
func RequestID() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.GetHeader(clientRequestKey)
		if id == "" {
			id = c.GetHeader(requestIDHeader)
		}
		if id == "" {
			id = uuid.NewString()
		}

		c.Set(requestIDKey, id)
		c.Writer.Header().Set(requestIDHeader, id)

		c.Next()
	}
}

// RequestIDFromContext retrieves the correlation identifier from Gin context.
func RequestIDFromContext(c *gin.Context) string {
	value, ok := c.Get(requestIDKey)
	if !ok {
		return ""
	}

	id, _ := value.(string)
	return id
}
