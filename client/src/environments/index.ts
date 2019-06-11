export type IAppEnvironment = 'local' | 'develop' | 'production'

export interface IWebpackEnvironment {
  api: IAppEnvironment
  client: IAppEnvironment
}

export interface IEnvironment extends IWebClientConfiguration, IApiConfiguration {}

export interface IWebClientConfiguration {
  app: {
    baseUrl: string
  }
  auth: IAuthConfiguration
}

export interface IAuthConfiguration {
  clientId: string
  domain: string
}

export interface IApiConfiguration {
  api: {
    baseUrl: string
  }
}

export const WebClients: { [E in IAppEnvironment]: IEnvironment } = {
  local: require('./web-clients/local'),
  develop: require('./web-clients/develop'),
  production: require('./web-clients/production')
}

export const Apis: { [E in IAppEnvironment]: IEnvironment } = {
  local: require('./apis/local'),
  develop: require('./apis/develop'),
  production: require('./apis/production')
}
