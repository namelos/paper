import { Post } from 'contexts/blog/Post'
import { Board } from 'contexts/kanban/board'
import { EntityBase } from 'contexts/utils/EntityBase'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { Credential } from './Credential'

@Entity()
export class User extends EntityBase<User> {
  @Column()
  username: string

  @OneToOne(type => Credential, credential => credential.user, { cascade: true })
  credential: Credential

  @OneToMany(type => Post, post => post.user)
  post: Array<Post>

  @OneToMany(type => Board, board => board.user)
  boards: Promise<Array<Board>>
}
