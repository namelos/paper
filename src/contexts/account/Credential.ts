import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Credential {
  constructor(props?: Partial<Credential>) {
    Object.assign(this, props)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  passwordDigest: string

  @OneToOne(type => User, user => user.credential, { eager: true })
  @JoinColumn()
  user: User
}
