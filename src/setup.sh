#!/bin/bash
# Build the API server docker container image
docker build -t assignment-api-server-image ./src
# Build the MySQL database docker container image
docker build -t assignment-database-image -f ./src/Dockerfile.database ./src

# Run docker-compose to start the containers
docker-compose up -d
