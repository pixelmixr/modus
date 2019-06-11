import { IApiConfiguration } from '..'

const env = (): IApiConfiguration => ({
  api: {
    baseUrl: 'http://localhost:3000/api'
  }
})

module.exports = env()
