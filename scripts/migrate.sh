#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../apps/api"
go run github.com/pressly/goose/v3/cmd/goose@latest postgres "${DATABASE_URL:-postgres://postgres:postgres@localhost:5432/movie_star?sslmode=disable}" up
