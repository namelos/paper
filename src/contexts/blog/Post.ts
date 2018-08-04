import { User } from 'contexts/account/User'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
  constructor(props?: Partial<Post>) {
    Object.assign(this, props)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column("text")
  content: string

  @ManyToOne(type => User, user => user.post, { eager: true })
  @JoinColumn()
  user: User
}
