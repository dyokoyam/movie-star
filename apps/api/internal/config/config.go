package config

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
)

// Config aggregates application settings sourced from environment variables.
type Config struct {
	App      AppConfig
	Server   ServerConfig
	Database DatabaseConfig
}

// AppConfig holds general application metadata.
type AppConfig struct {
	Name string `env:"APP_NAME"        envDefault:"movie-star-api"`
	Env  string `env:"APP_ENV"         envDefault:"development"`
}

// ServerConfig configures the HTTP server.
type ServerConfig struct {
	Host            string        `env:"API_HOST"             envDefault:"0.0.0.0"`
	Port            int           `env:"API_PORT"             envDefault:"8080"`
	ReadTimeout     time.Duration `env:"API_READ_TIMEOUT"     envDefault:"15s"`
	WriteTimeout    time.Duration `env:"API_WRITE_TIMEOUT"    envDefault:"15s"`
	IdleTimeout     time.Duration `env:"API_IDLE_TIMEOUT"     envDefault:"60s"`
	ShutdownTimeout time.Duration `env:"API_SHUTDOWN_TIMEOUT" envDefault:"10s"`
}

// Address returns the listen address in host:port format.
func (c ServerConfig) Address() string {
	return fmt.Sprintf("%s:%d", c.Host, c.Port)
}

// DatabaseConfig describes PostgreSQL settings.
type DatabaseConfig struct {
	URL             string        `env:"DATABASE_URL"               envDefault:"postgres://movie_star:movie_star@localhost:5432/movie_star?sslmode=disable"`
	MaxConns        int32         `env:"DATABASE_MAX_CONNS"         envDefault:"8"`
	MaxConnIdleTime time.Duration `env:"DATABASE_MAX_CONN_IDLE_TIME" envDefault:"5m"`
}

// Load attempts to populate Config using provided dotenv files (if available) and the current environment.
func Load(dotenvPaths ...string) (Config, error) {
	for _, path := range dotenvPaths {
		if path == "" {
			continue
		}

		if err := godotenv.Load(path); err != nil {
			// Ignore missing .env files to keep configuration flexible.
			if !errors.Is(err, os.ErrNotExist) {
				return Config{}, fmt.Errorf("load dotenv file %q: %w", path, err)
			}
		}
	}

	var cfg Config
	if err := env.Parse(&cfg); err != nil {
		return Config{}, fmt.Errorf("parse environment variables: %w", err)
	}

	return cfg, nil
}
