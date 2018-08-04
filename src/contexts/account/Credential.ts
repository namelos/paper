import { EntityBase } from 'contexts/utils/EntityBase'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Credential extends EntityBase<Credential> {
  @Column()
  passwordDigest: string

  @OneToOne(type => User, user => user.credential, { eager: true })
  @JoinColumn()
  user: User
}
