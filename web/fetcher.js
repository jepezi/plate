class FetcherBase {
  constructor(url) {
    this.url = url;
  }

  async fetch(
    operation,
    variables,
    cacheConfig,
    uploadables,
  ) {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: operation.text, variables }),
    })
    return response.json()
  }
}

export class ClientFetcher extends FetcherBase {
  constructor(url, payloads) {
    super(url)

    this.payloads = payloads || []
  }

  async fetch(...args) {
    if (this.payloads.length) {
      return this.payloads.shift()
    }

    return super.fetch(...args)
  }
}
