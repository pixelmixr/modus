import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()

mongoose.Promise = bluebird

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('Database connected.')})
  .catch(error => console.log('Mongo connection error. ' + error))

app.set('port', process.env.API_PORT)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send({ message: 'hello world!'}))

app.listen(process.env.API_PORT,  () => {
  console.log(`Listening on port ${process.env.API_PORT}`)
})
