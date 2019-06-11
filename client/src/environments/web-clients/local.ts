import { IWebClientConfiguration } from '..'

const env = (): IWebClientConfiguration => ({
  app: {
    baseUrl: 'http://localhost:8080'
  },
  auth: {
    domain: 'pixelmixr.auth0.com',
    clientId: 'u74BKaYyYWLQqCu8gUSrJfSGdc3J64XM'
  }
})

module.exports = env()
