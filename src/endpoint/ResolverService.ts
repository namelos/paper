import { Service } from 'typedi'
import { NotesContext } from 'contexts/notes'
import { AccountContext } from 'contexts/account'

@Service()
export class ResolverService {
  constructor(
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
        users() {
          return that.accountContext.getUsers()
        }
      },
      Mutation: {
        addNote(_, { text }) {
          return that.notesContext.insert(text)
        },
        async createAccount(_, { username, password }) {
          await that.accountContext.createAccount(username, password)
          return {
            token: '123321'
          }
        }
      }
    }
  }
}
