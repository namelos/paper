import { Service } from 'typedi'
import uuid from 'uuid'

@Service()
export class NotesContext {
  private notes: Array<Note> = []

  insert(text) {
    const note = { id: uuid(), text }
    this.notes.push(note)
    return note
  }

  all() {
    return this.notes
  }
}
