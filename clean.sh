#!/bin/bash

## Just a quick way to tear down and rebuild when testing.

docker-compose down
docker volume rm modus_db-data
docker volume rm modus_logs
docker-compose build
docker-compose up -d
