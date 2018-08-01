import { Service } from 'typedi'
import { GraphQLSchema } from 'graphql'
import typeDefs from 'endpoint/schema.graphql'
import { gql, makeExecutableSchema } from 'apollo-server-express'
import { ResolverService } from 'endpoint/ResolverService'

@Service()
export class SchemaService {
  schema: GraphQLSchema

  constructor(private resolverService: ResolverService) {
    this.createSchema()
  }

  createSchema() {
    this.schema = makeExecutableSchema({
      typeDefs: gql(typeDefs),
      resolvers: this.resolverService.get()
    })
  }
}
