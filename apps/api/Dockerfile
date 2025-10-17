# syntax=docker/dockerfile:1.7
FROM golang:1.25-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server ./cmd/server

FROM gcr.io/distroless/base-debian12
WORKDIR /app
COPY --from=build /app/server ./server
EXPOSE 8080
ENTRYPOINT ["./server"]
