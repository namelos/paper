import { AccountContext } from 'contexts/account'
import { NotesContext } from 'contexts/notes'
import { TokenService } from 'libs/TokenService'
import { Service } from 'typedi'

@Service()
export class ResolverService {
  constructor(
    private tokenService: TokenService,
    private notesContext: NotesContext,
    private accountContext: AccountContext
  ) {}

  get() {
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
