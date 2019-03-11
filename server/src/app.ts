import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import bodyParser from 'body-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { IUser } from './models/user';

const MongoStore = connectMongo(session)
dotenv.config()

// temporary testing
const users: IUser[] = [
  { id: '1', email: 'chris@pixelmixr.com', password: 'password' },
  { id: '2', email: 'kennethdogg@gmail.com', password: 'password1' }
]

passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done) => {
  const user = users.find(u => u.email === email && u.password === password)

  if (user) {
    return done(null, user)
  }
}))

passport.serializeUser((user: IUser, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id)
  done(null, user)
})

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('Database connected.')})
  .catch(error => console.log('Mongo connection error. ' + error))

mongoose.Promise = bluebird

const app = express()

app.set('port', process.env.API_PORT)
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.SESSIONDB_URI })
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.get('/', (req, res) => {
  console.log('inside GET')
  console.log(req.sessionID)
  res.send('Home page\n')
})

app.get('/login', (req, res) => {
  console.log('inside GET /login')
  console.log(req.sessionID)
  res.send('Login page\n')
})

app.post('/login', (req, res, next) => {
  console.log('inside POST /login')
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport authenticate')
    console.log(`session: ${JSON.stringify(req.session.passport)}`)
    console.log(`user: ${req.user}`)
    req.login(user, err => {
      console.log('Inside req.login')
      console.log(`session: ${JSON.stringify(req.session.passport)}`)
      console.log(`user: ${req.user}`)
      return res.send('Logged in!\n')
    })
  })(req, res, next)
})

app.get('/authrequired', (req, res) => {
  console.log('inside GET /authrequired')
  console.log(`user auth? ${req.isAuthenticated()}`)
  if (req.isAuthenticated()) {
    res.send('you hit the auth endpoint\n')
  } else {
    res.redirect('/')
  }
})

app.listen(process.env.API_PORT,  () => {
  console.log(`Listening on port ${process.env.API_PORT}`)
})
