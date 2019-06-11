import auth0 from 'auth0-js'
import { Environment } from '../environment'
import { LocalStorageService } from './local-storage'

export const Auth = new class {
  private readonly tokenKey = 'TOKEN'
  private readonly auth0 = new auth0.WebAuth({
    domain: Environment.auth.domain,
    clientID: Environment.auth.clientId,
    redirectUri: `${Environment.app.baseUrl}/auth/callback`,
    responseType: 'token id_token',
    scope: 'openid'
  })

  login() {
    this.auth0.authorize()
  }

  isAuthenticated() {
    const token = LocalStorageService.get<string>(this.tokenKey)
    return !!token
  }
}()
