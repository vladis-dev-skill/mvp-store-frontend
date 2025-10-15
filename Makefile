.PHONY: help init build up down restart logs exec_bash install dev health clean

# Variables
DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml
PROJECT_NAME = mvp-store-frontend
CONTAINER_NAME = mvp-store-frontend

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# ============================================
# Development Commands
# ============================================

install: ## Install Node.js dependencies
	npm install

dev: ## Start development server (without Docker)
	npm run dev

build-local: ## Build Next.js application locally
	npm run build

start-local: ## Start production build locally
	npm run start

init: network-check build up ## Initialize and start frontend service (first run)
	@echo "Frontend service initialized successfully!"
	@echo "Access at: http://localhost:3000"
	@echo "Via API Gateway: http://localhost:8090"

build: ## Build Docker image
	#$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) build

up: network-check ## Start frontend service
	$(DOCKER_COMPOSE) up -d
	@echo "Frontend service started"
	@echo "Waiting for service to be ready..."
	@sleep 10
	@$(MAKE) health

down: ## Stop frontend service
	$(DOCKER_COMPOSE) down

restart: down up ## Restart frontend service

exec_bash: ## Access frontend container shell
	docker exec -it $(CONTAINER_NAME) sh

network-check: ## Check if mvp_store_network exists
	@docker network inspect mvp_store_network >/dev/null 2>&1 || \
		(echo "Network mvp_store_network does not exist. Creating..." && $(MAKE) network-create)

network-create: ## Create shared network
	docker network create mvp_store_network

network-remove: ## Remove shared network
	docker network rm mvp_store_network

# ============================================
# Maintenance
# ============================================

clean: ## Clean up containers, images, and volumes
	$(DOCKER_COMPOSE) down -v --rmi all
	@echo "Cleaned up frontend service"

clean-local: ## Clean local build artifacts
	rm -rf .next
	rm -rf node_modules
	@echo "Cleaned local artifacts"

rebuild: clean build up ## Rebuild and restart service

ps: ## Show running containers
	$(DOCKER_COMPOSE) ps

stats: ## Show container resource usage
	docker stats $(CONTAINER_NAME) --no-stream
