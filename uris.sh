#!/bin/bash

## Copies stuff from the main .env into one in server dir

source .env
rm server/.env

MONGODB_URI="MONGODB_URI=mongodb://$MODUS_USERNAME:$MODUS_PASSWORD@localhost:27017/$MODUS_DATABASE"
SESSIONDB_URI="SESSIONDB_URI=mongodb://$MODUS_SESSION_USERNAME:$MODUS_SESSION_PASSWORD@localhost:27017/$MODUS_SESSION_DATABASE"
echo $MONGODB_URI >> server/.env
echo $SESSIONDB_URI >> server/.env
echo "API_PORT=$API_PORT" >> server/.env
echo "SESSION_SECRET=$SESSION_SECRET" >> server/.env
