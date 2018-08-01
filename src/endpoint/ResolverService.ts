import { Service } from 'typedi'
import { NotesContext } from 'contexts/notes'

@Service()
export class ResolverService {
  constructor(private notesContext: NotesContext) {}

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
        }
      }
    }
  }
}
