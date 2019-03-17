var adminDatabase = cat("/tmp/secrets/MONGO_INITDB_ROOT_DATABASE").slice(0, -1)
var adminUsername = cat("/tmp/secrets/MONGO_INITDB_ROOT_USERNAME").slice(0, -1)
var adminPassword = cat("/tmp/secrets/MONGO_INITDB_ROOT_PASSWORD").slice(0, -1)
var sessionDatabase = cat("/tmp/secrets/MODUS_SESSION_DATABASE").slice(0, -1)
var sessionUsername = cat("/tmp/secrets/MODUS_SESSION_USERNAME").slice(0, -1)
var sessionPassword = cat("/tmp/secrets/MODUS_SESSION_PASSWORD").slice(0, -1)
var database = cat("/tmp/secrets/MODUS_DATABASE").slice(0, -1)
var username = cat("/tmp/secrets/MODUS_USERNAME").slice(0, -1)
var password = cat("/tmp/secrets/MODUS_PASSWORD").slice(0, -1)

conn = new Mongo()
db = conn.getDB(adminDatabase)
db.auth(adminUsername, adminPassword)

// Create user for session database
db = conn.getDB(sessionDatabase)
db.createUser({
  user: sessionUsername,
  pwd: sessionPassword,
  passwordDigestor: 'server',
  roles: [{
    role: "readWrite",
    db: sessionDatabase
  }]
})

// Create user for main database
db = conn.getDB(database)
db.createUser({
  user: username,
  pwd: password,
  passwordDigestor: 'server',
  roles: [{
    role: "readWrite",
    db: database
  }]
})
