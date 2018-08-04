import { User } from 'contexts/account/User'
import { EntityBase } from 'contexts/utils/EntityBase'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity()
export class Post extends EntityBase<Post> {
  @Column()
  title: string

  @Column("text")
  content: string

  @ManyToOne(type => User, user => user.post, { eager: true })
  @JoinColumn()
  user: User
}
