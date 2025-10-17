SHELL := /usr/bin/env bash

.DEFAULT_GOAL := dev

.PHONY: deps dev lint test build api migrate

DATABASE_URL ?= postgres://postgres:postgres@localhost:5432/movie_star?sslmode=disable

deps:
	pnpm install

dev:
	pnpm dev

lint:
	pnpm lint

test:
	pnpm test

build:
	pnpm build

api:
	cd apps/api && go run ./cmd/server

migrate:
	cd apps/api && go run github.com/pressly/goose/v3/cmd/goose@latest postgres "$(DATABASE_URL)" up
