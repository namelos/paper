import { AccountContext } from 'contexts/account/accountContext'
import { User } from 'contexts/account/User'
import { Board } from 'contexts/kanban/board'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

@Service()
export class KanbanContext {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    private accountContext: AccountContext
  ) {}

  async boards(user: User) {
    return await this.accountContext.findByUserRelation(user, 'boards')
  }

  async createBoard({ name, user }) {
    const board = new Board({ name, user, boardColumns: [] })
    await this.boardRepository.save(board)
    return board
  }
}
