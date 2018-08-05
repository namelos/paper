import { AccountContext } from 'contexts/account/accountContext'
import { User } from 'contexts/account/User'
import { Board } from 'contexts/kanban/board'
import { BoardColumn } from 'contexts/kanban/boardColumn'
import { Card } from 'contexts/kanban/card'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

@Service()
export class KanbanContext {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(BoardColumn) private boardColumnRepository: Repository<BoardColumn>,
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    private accountContext: AccountContext
  ) {}

  async boards(user: User) {
    return await user.boards
  }

  async createBoard({ name, user }) {
    const board = new Board({ name, user })
    return this.boardRepository.save(board)
  }

  async getBoard(id: string) {
    return await this.boardRepository.findOne(id)
  }

  async getBoardColumn(id: string) {
    return await this.boardColumnRepository.findOne(id)
  }

  async createBoardColumn({ name, board }) {
    const boardColumn = new BoardColumn({ name, board: Promise.resolve(board) })
    return await this.boardColumnRepository.save(boardColumn)
  }

  async createCard({ name, boardColumn }) {
    const card = new Card({ name, boardColumn })
    return await this.cardRepository.save(card)
  }
}
