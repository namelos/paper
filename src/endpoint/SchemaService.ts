import { Service } from 'typedi'
import { GraphQLSchema } from 'graphql'
import typeDefs from './schema.graphql'
import { gql, makeExecutableSchema } from 'apollo-server-express'
import { NotesContext } from '../contexts/notes'

@Service()
export class SchemaService {
  schema: GraphQLSchema

  constructor(private notesContext: NotesContext) {
    this.createSchema()
  }

  get resolvers() {
    const that = this

    return {
      Query: {
        hello() { return 'world' },
        notes() { return that.notesContext.all() }
      },
      Mutation: {
        addNote(_, { text }) {
          return that.notesContext.insert(text)
        }
      }
    }
  }

  createSchema() {
    this.schema = makeExecutableSchema({
      typeDefs: gql(typeDefs),
      resolvers: this.resolvers
    })
  }
}
