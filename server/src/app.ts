import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import bodyParser from 'body-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'

dotenv.config()

const MongoStore = connectMongo(session)
const app = express()

mongoose.Promise = bluebird

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('Database connected.')})
  .catch(error => console.log('Mongo connection error. ' + error))

app.set('port', process.env.API_PORT)
app.use(session({
  store: new MongoStore({ url: process.env.SESSIONDB_URI }),
  secret: 'something',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  console.log('inside GET')
  console.log(req.sessionID)
  res.send({ message: 'hello world!'})
})

app.get('/login', (req, res) => {
  console.log('inside GET /login')
  console.log(req.sessionID)
  res.send('Login page\n')
})

app.post('/login', (req, res) => {
  console.log('inside POST /login')
  console.log(req.body)
  res.send('POST to login page\n')
})

app.listen(process.env.API_PORT,  () => {
  console.log(`Listening on port ${process.env.API_PORT}`)
})
