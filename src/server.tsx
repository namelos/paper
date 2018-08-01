import 'reflect-metadata'
import { useContainer as controllerUseContainer } from 'routing-controllers'
import { createConnection, useContainer as typeormUseContainer } from 'typeorm'
import { Container } from 'typedi'
import { ServerService } from './bootstrap/ServerService'
import { Note } from './contexts/notes/Note'
import config from '../ormConfig.json'

(async () => {
  controllerUseContainer(Container)
  typeormUseContainer(Container)

  try {
    await createConnection({ ...config, entities: [Note] })
  } catch (e) {
    console.log('connect failed', e)
  }

  Container.get(ServerService).listen()
})()
