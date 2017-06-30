import {
  Environment,
  Network,
  RecordSource,
  Store,
  ConnectionHandler,
  ViewerHandler
} from "relay-runtime"

function handlerProvider(handle) {
  switch (handle) {
    case "connection":
      return ConnectionHandler
    case "viewer":
      return ViewerHandler
  }
  throw new Error(`handlerProvider: No handler provided for ${handle}`)
}

function createRelayEnvironment(fetcher) {
  const network = Network.create((...args) => fetcher.fetch(...args))
  return new Environment({
    handlerProvider,
    network,
    store: new Store(new RecordSource()),
  })
}

export default createRelayEnvironment
