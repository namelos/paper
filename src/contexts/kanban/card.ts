import { BoardColumn } from 'contexts/kanban/boardColumn'
import { EntityBase } from 'contexts/utils/EntityBase'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity()
export class Card extends EntityBase<Card> {
  @Column()
  name: string

  @ManyToOne(type => BoardColumn, boardColumn => boardColumn.cards)
  @JoinColumn()
  boardColumn: BoardColumn
}

