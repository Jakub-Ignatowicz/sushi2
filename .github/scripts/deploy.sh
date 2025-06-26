#!/bin/bash

COMPOSE_FILES="-f docker-compose.yaml"

if [ "$STAGE" != "production" ]; then
	COMPOSE_FILES="$COMPOSE_FILES -f docker-compose.dev.yaml"
fi

docker compose $COMPOSE_FILES down
docker compose $COMPOSE_FILES build
docker compose $COMPOSE_FILES up -d --wait --wait-timeout 30
