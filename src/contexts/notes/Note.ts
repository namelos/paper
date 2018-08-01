import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  text: string
}
