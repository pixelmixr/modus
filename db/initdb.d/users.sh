#!/bin/bash
set -e

mongo <<EOF
use admin
db.createUser({
  user:  '$MODUS_SESSION_USER',
  pwd: '$MODUS_SESSION_PASS',
  roles: [{
    role: 'readWrite',
    db: 'modus-session'
  }]
})
db.createUser({
  user:  '$MODUS_USER',
  pwd: '$MODUS_PASS',
  roles: [{
    role: 'readWrite',
    db: 'modus'
  }]
})
EOF
