#!/bin/bash

if [ "$STAGE" = "production" ]; then
	docker compose -f docker-compose.yaml down
	docker compose -f docker-compose.yaml build
	docker compose -f docker-compose.yaml up -d
else
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml down
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml build
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
fi
