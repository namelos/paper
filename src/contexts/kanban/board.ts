import { User } from 'contexts/account/User'
import { BoardColumn } from 'contexts/kanban/boardColumn'
import { EntityBase } from 'contexts/utils/EntityBase'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class Board extends EntityBase<Board> {
  @Column()
  name: string

  @ManyToOne(type => User, user => user.post, { eager: true })
  @JoinColumn()
  user: Promise<User>

  @OneToMany(type => BoardColumn, boardColumn => boardColumn.board, { cascade: true })
  boardColumns: Promise<BoardColumn[]>
}
