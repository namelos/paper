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

  get Query() {
    return {
      hello: () => 'world',
      notes: () => this.notesContext.all(),
      me: async (_, {}, context) => await this.verifyUser(context)
    }
  }

  get Mutation() {
    return {
      addNote: (_, { text }) => this.notesContext.insert(text),
      register: async (_, { username, password }, context) => {
        const token = await this.accountContext.createAccount(username, password)
        return this.signUser(context, token)
      },
      login: async (_, { username, password }, context) => {
        const token = await this.accountContext.login(username, password)
        return this.signUser(context, token)
      }
    }
  }

  get resolvers() {
    const that = this

    return {
      Query: {...this.Query},
      Mutation: {...this.Mutation}
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
