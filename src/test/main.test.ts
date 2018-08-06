import { Credential } from 'contexts/account/Credential'
import { User } from 'contexts/account/User'
import { Post } from 'contexts/blog/Post'
import { Board } from 'contexts/kanban/board'
import { BoardColumn } from 'contexts/kanban/boardColumn'
import { Card } from 'contexts/kanban/card'
import { Note } from 'contexts/notes/Note'
import request from 'supertest'
import { bootstrap } from 'endpoint'
import { Connection, createConnection, getRepository } from 'typeorm'
import uuid from 'uuid'

it('should return response', async () => {
  const app = await bootstrap()

  return await request(app)
    .post('/api')
    .send({
      query: `
        {
          hello
        }
      `
    })
    .expect(200)
})

describe('data storage test', () => {
  let connection: Connection
  let connectionName: string

  beforeEach(async () => {
    connectionName = uuid()

    connection = await createConnection({
      name: connectionName,
      type: 'sqljs',
      entities: [
        Note, User, Credential, Post, Board, BoardColumn, Card
      ],
      logging: false,
      dropSchema: true,
      synchronize: true
    })
  })

  afterEach(async () => {
    await connection.close()
  })

  it('save and query', async () => {
    const user = new User({ username: 'John' })

    const userRepository = getRepository(User, connectionName)
    await userRepository.save(user)

    const result = await userRepository.findOne()
    expect(result.username).toBe('John')
  })

  it('test should not affect each other', async () => {
    const userRepository = getRepository(User, connectionName)
    const result = await userRepository.findOne()
    expect(result).toBeUndefined()
  })
})
