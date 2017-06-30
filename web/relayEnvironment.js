import {
  Environment,
  Network,
  RecordSource,
  Store,
  ConnectionHandler,
  ViewerHandler
} from "relay-runtime"

function fetchQuery(
  operation,
  variables,
  cacheConfig,
  uploadables,
) {
  return fetch('http://localhost:8000/api/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "content-type": "application/json"
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json()
  });
}

const network = Network.create(fetchQuery)
function handlerProvider(handle) {
  switch (handle) {
    case "connection":
      return ConnectionHandler
    case "viewer":
      return ViewerHandler
  }
  throw new Error(`handlerProvider: No handler provided for ${handle}`)
}

export default new Environment({
  handlerProvider,
  network,
  store: new Store(new RecordSource()),
})
