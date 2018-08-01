import { Service } from 'typedi'
import { Note } from './Note'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Service()
export class NotesContext {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>
  ) {}

  async insert(text) {
    const note = new Note(text)
    await this.noteRepository.insert(note)
    return note
  }

  async all() {
    return await this.noteRepository.find()
  }
}
