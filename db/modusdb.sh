#!/bin/bash

mkdir -p data
mkdir -p log
touch log/mongo.log
chmod 666 log/mongo.log

source .env

docker run -d --name modus-db \
    -e MONGO_INITDB_ROOT_USERNAME=$MONGO_ROOT_USER \
    -e MONGO_INITDB_ROOT_PASSWORD=$MONGO_ROOT_PASS \
    -e MODUS_SESSION_USER=$MODUS_SESSION_USER \
    -e MODUS_SESSION_PASS=$MODUS_SESSION_PASS \
    -e MODUS_USER=$MODUS_USER \
    -e MODUS_PASS=$MODUS_PASS \
    -v $MONGO_DIR/etc:/etc/mongo \
    -v $MONGO_DIR/log:/var/log/mongodb \
    -v $MONGO_DIR/data:/data/db \
    -v $MONGO_DIR/initdb.d:/docker-entrypoint-initdb.d \
    -p 27017:27017 \
    mongo:latest \
    --config /etc/mongo/mongod.conf
