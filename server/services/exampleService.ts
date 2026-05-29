import ExampleApiClient from '../data/exampleApiClient'

export default class ExampleService {
  constructor(private readonly exampleApiClient: ExampleApiClient) {}

  async getCurrentTime() {
    return new Date().toISOString() // this.exampleApiClient.getCurrentTime()
  }
}
