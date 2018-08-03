import { ApolloServer } from 'apollo-server-express'
import { Credential } from 'contexts/account/Credential'
import { User } from 'contexts/account/User'
import { Note } from 'contexts/notes/Note'
import cookieParser from 'cookie-parser'
import { QLService } from 'endpoint/QLService'
import { RenderController } from 'endpoint/RenderController'
import express from 'express'
import 'reflect-metadata'
import { useContainer as controllerUseContainer, useExpressServer } from 'routing-controllers'
import { Container } from 'typedi'
import { createConnection, useContainer as typeormUseContainer } from 'typeorm'
import config from '../../ormConfig.json'

export async function bootstrap() {
  const app = express()

  controllerUseContainer(Container)
  typeormUseContainer(Container)

  try {
    await createConnection({ ...config, entities: [Note, User, Credential] })
  } catch (e) {
    console.log('connect failed', e)
  }

  app.use(cookieParser())

  new ApolloServer({
    schema: Container.get(QLService).schema,
    context: ({ req, res }) => ({ req, res })
  }).applyMiddleware({ app, path: '/api' })

  useExpressServer(app, { controllers: [RenderController] })

  app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000`))
}
