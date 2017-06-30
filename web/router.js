import queryMiddleware from 'farce/lib/queryMiddleware'
import createRender from 'found/lib/createRender'
import { Resolver } from 'found-relay'
import createRelayEnvironment from './createRelayEnvironment'

export const historyMiddlewares = [queryMiddleware]

export function createResolver(fetcher) {
  const environment = createRelayEnvironment(fetcher)
  return new Resolver(environment)
}

export const render = createRender({});
