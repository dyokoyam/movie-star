package logger

import (
	"fmt"
	"strings"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// New constructs a zap.Logger configured for the provided environment.
func New(env string) (*zap.Logger, error) {
	switch strings.ToLower(env) {
	case "prod", "production":
		cfg := zap.NewProductionConfig()
		cfg.EncoderConfig.TimeKey = "timestamp"
		cfg.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder

		return cfg.Build()
	case "test":
		return zap.NewNop(), nil
	default:
		cfg := zap.NewDevelopmentConfig()
		cfg.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder

		return cfg.Build()
	}
}

// Must returns logger or panics if creation fails.
func Must(log *zap.Logger, err error) *zap.Logger {
	if err != nil {
		panic(fmt.Sprintf("failed to create logger: %v", err))
	}

	return log
}
