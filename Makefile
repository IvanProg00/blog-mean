.PHONY: dev
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

.PHONY: prod
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

.DEFAULT_GOAL := prod