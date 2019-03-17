#!/bin/bash

## Copies stuff from the main .env into one in server dir

source .env
rm server/.env

echo "MONGODB_URI=$MONGODB_URI" >> server/.env
echo "SESSIONDB_URI=$SESSIONDB_URI" >> server/.env
echo "API_PORT=$API_PORT" >> server/.env
echo "SESSION_SECRET=$SESSION_SECRET" >> server/.env
