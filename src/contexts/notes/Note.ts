import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Note {
  constructor(text: string) {
    this.text = text
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  text: string
}
