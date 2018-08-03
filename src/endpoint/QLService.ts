import { gql, makeExecutableSchema } from 'apollo-server-express'
import { AccountContext } from 'contexts/account'
import { NotesContext } from 'contexts/notes'
import typeDefs from 'endpoint/schema.graphql'
import { Service } from 'typedi'

@Service()
export class QLService {
  constructor(
    private notesContext: NotesContext,
    private accountContext: AccountContext
  ) {}

  get resolvers() {
    const that = this

    return {
      Query: {
        hello() {
          return 'world'
        },
        notes() {
          return that.notesContext.all()
        },
        async me(_, {}, context) {
          return await that.verifyUser(context)
        }
      },
      Mutation: {
        addNote(_, { text }) {
          return that.notesContext.insert(text)
        },
        async register(_, { username, password }, context) {
          const token = await that.accountContext.createAccount(username, password)
          return that.signUser(context, token)
        },
        async login(_, { username, password }, context) {
          const token = await this.accountContext.login(username, password)
          return that.signUser(context, token)
        }
      }
    }
  }

  get schema() {
    return makeExecutableSchema({ typeDefs: gql(typeDefs), resolvers: this.resolvers })
  }

  private signUser(context, token) {
    context.res.cookie('authorization', token)
    return token
  }

  private async verifyUser(context) {
    if (!context || !context.req) return null
    const token = context.req.cookies.authorization
    return this.accountContext.getUserByToken(token)
  }
}
