import { Service } from 'typedi'
import express, { Express } from 'express'
import { useExpressServer } from 'routing-controllers'
import { ApolloServer } from 'apollo-server-express'
import { RenderController } from 'endpoint/RenderController'
import { SchemaService } from 'bootstrap/SchemaService'

@Service()
export class ServerService {
  app: Express

  constructor(private schemaService: SchemaService) {
    this.app = express()
  }

  addControllers() {
    useExpressServer(this.app, {
      controllers: [RenderController]
    })
  }

  addGraphQLEndpoint() {
    new ApolloServer({ schema: this.schemaService.schema }).applyMiddleware({ app: this.app, path: '/api' })
  }

  listen() {
    this.addGraphQLEndpoint()
    this.addControllers()
    this.app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000`))
  }
}
