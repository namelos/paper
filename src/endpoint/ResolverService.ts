import { Service } from 'typedi'
import { NotesContext } from 'contexts/notes'
import { AccountContext } from 'contexts/account'
import { User } from '../contexts/account/User'
import { TokenService } from '../libs/TokenService'

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
        }
      },
      Mutation: {
        addNote(_, { text }) {
          return that.notesContext.insert(text)
        },
        async createAccount(_, { username, password }) {
          const user = await that.accountContext.createAccount(username, password)
          return await that.generateToken(user)
        }
      }
    }
  }

  private async generateToken(user: User) {
    return { token: await this.tokenService.sign(user.id) }
  }
}
