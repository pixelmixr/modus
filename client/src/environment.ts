import { IAppEnvironment, Apis, WebClients } from './environments'

declare var DEFINE_APP_WEB_CLIENT: IAppEnvironment
declare var DEFINE_APP_API: IAppEnvironment

export const Environment = {
  ...Apis[DEFINE_APP_API],
  ...WebClients[DEFINE_APP_WEB_CLIENT]
}
