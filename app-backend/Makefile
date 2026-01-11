.PHONY: help dev build test lint fmt generate generate-api generate-db docker-build docker-run clean

# Default target
help:
	@echo "Available targets:"
	@echo "  dev            - Run development server"
	@echo "  build          - Build binary"
	@echo "  test           - Run tests"
	@echo "  lint           - Run linter"
	@echo "  fmt            - Format code"
	@echo "  generate       - Generate all (API + DB)"
	@echo "  generate-api   - Generate API code from OpenAPI"
	@echo "  generate-db    - Generate DB code from SQL"
	@echo "  docker-build   - Build Docker image"
	@echo "  docker-run     - Run Docker container"
	@echo "  clean          - Clean build artifacts"

# Development
dev:
	go run ./cmd/server

# Build
build:
	CGO_ENABLED=0 go build -ldflags="-w -s" -o bin/server ./cmd/server

# Test
test:
	go test -v ./...

# Lint
lint:
	golangci-lint run

# Format
fmt:
	go fmt ./...
	goimports -w .

# Generate all
generate: generate-api generate-db

# Generate API code from OpenAPI spec
generate-api:
	@echo "Generating API code from OpenAPI spec..."
	oapi-codegen -generate types -package api -o api/generated/types.gen.go api/openapi.yaml
	oapi-codegen -generate server -package api -o api/generated/server.gen.go api/openapi.yaml

# Generate DB code from SQL
generate-db:
	@echo "Generating DB code from SQL..."
	sqlc generate

# Docker
docker-build:
	docker build -t wyly-backend:latest .

docker-run:
	docker run -p 8080:8080 --env-file .env wyly-backend:latest

# Clean
clean:
	rm -rf bin/
	rm -rf api/generated/*.gen.go
	rm -rf internal/db/generated/*.go

# Install tools
tools:
	go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install golang.org/x/tools/cmd/goimports@latest
