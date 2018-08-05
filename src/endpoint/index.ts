import { ApolloServer } from 'apollo-server-express'
import { Credential } from 'contexts/account/Credential'
import { User } from 'contexts/account/User'
import { Post } from 'contexts/blog/Post'
import { Board } from 'contexts/kanban/board'
import { BoardColumn } from 'contexts/kanban/boardColumn'
import { Card } from 'contexts/kanban/card'
import { Note } from 'contexts/notes/Note'
import cookieParser from 'cookie-parser'
import { QLService } from 'endpoint/QLService'
import { RenderController } from 'endpoint/RenderController'
import express from 'express'
import 'reflect-metadata'
import { useContainer as controllerUseContainer, useExpressServer } from 'routing-controllers'
import { Container } from 'typedi'
import { createConnection, useContainer as typeormUseContainer } from 'typeorm'
import pgConnectionString from 'pg-connection-string'

export async function bootstrap() {
  const app = express()

  controllerUseContainer(Container)
  typeormUseContainer(Container)

  try {
    const entities = [Note, User, Credential, Post, Board, BoardColumn, Card]

    if (process.env.NODE_ENV !== 'production') {
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'paper',
        synchronize: true,
        entities
      })
    } else {
      const options = pgConnectionString.parse(process.env.DATABASE_URL)

      await createConnection({
        type: 'postgres',
        host: options.host,
        port: options.port,
        username: options.user,
        password: options.password,
        database: options.database,
        synchronize: true,
        entities,
        extra: {
          ssl: true
        }
      })
    }
  } catch (e) {
    console.log('connect failed', e)
  }

  app.use(cookieParser())

  new ApolloServer({
    schema: Container.get(QLService).schema,
    context: ({ req, res }) => ({ req, res })
  }).applyMiddleware({ app, path: '/api' })

  app.use(express.static(__dirname))

  useExpressServer(app, { controllers: [RenderController] })

  app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000`))
}
