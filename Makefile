# Makefile for Energy Consumption Prediction Project

# Default: show help
.DEFAULT_GOAL := help

DC=docker-compose
BACKEND_SERVICE=backend
FRONTEND_SERVICE=frontend

.PHONY: help up build stop down logs clean

help: 
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS=":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

up:
	$(DC) up --build -d

# build: ## Build/rebuild all services
# 	$(DC) build

stop: 
	$(DC) stop

down:
	$(DC) down

logs:
	$(DC) logs -f

logs-backend:
	$(DC) logs -f $(BACKEND_SERVICE)

logs-frontend:
	$(DC) logs -f $(FRONTEND_SERVICE)

clean:
	$(DC) down -v --remove-orphans