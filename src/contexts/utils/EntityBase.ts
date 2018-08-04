import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

export abstract class EntityBase<T> {
  constructor(props?: Partial<T>) {
    Object.assign(this, props)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @VersionColumn()
  version: number
}
