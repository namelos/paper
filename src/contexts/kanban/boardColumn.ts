import { Board } from 'contexts/kanban/board'
import { Card } from 'contexts/kanban/card'
import { EntityBase } from 'contexts/utils/EntityBase'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class BoardColumn extends EntityBase<BoardColumn> {
  @Column()
  name: string

  @ManyToOne(type => Board, board => board.boardColumns)
  @JoinColumn()
  board: Board

  @OneToMany(type => Card, card => card.boardColumns, { eager: true })
  cards: Array<Card>
}
