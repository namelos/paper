import { Post } from 'contexts/blog/Post'
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Credential } from './Credential'

@Entity()
export class User {
  constructor(props?: Partial<User>) {
    Object.assign(this, props)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @OneToOne(type => Credential, credential => credential.user)
  credential: Credential

  @OneToMany(type => Post, post => post.user)
  post: Array<Post>
}
