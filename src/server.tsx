import 'reflect-metadata'
import { useContainer as controllerUseContainer } from 'routing-controllers'
import { createConnection, useContainer as typeormUseContainer } from 'typeorm'
import { Container } from 'typedi'
import { ServerService } from './bootstrap/ServerService'
import config from '../ormConfig.json'
import { Note } from 'contexts/notes/Note'
import { User } from 'contexts/account/User'
import { Credential } from 'contexts/account/Credential'

(async () => {
  controllerUseContainer(Container)
  typeormUseContainer(Container)

  try {
    await createConnection({ ...config, entities: [Note, User, Credential] })
  } catch (e) {
    console.log('connect failed', e)
  }

  Container.get(ServerService).listen()
})()
