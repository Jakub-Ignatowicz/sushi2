#!/bin/bash

PROJECT_NAME="prod"
COMPOSE_FILES="-f docker-compose.yaml"

if [ "$STAGE" != "Production" ]; then
	PROJECT_NAME="dev"
	COMPOSE_FILES="$COMPOSE_FILES -f docker-compose.dev.yaml"
fi

docker compose -p $PROJECT_NAME $COMPOSE_FILES down
docker compose -p $PROJECT_NAME $COMPOSE_FILES build
docker compose -p $PROJECT_NAME $COMPOSE_FILES up -d --wait --wait-timeout 30
