import { Service } from 'typedi'
import { InjectManager, InjectRepository } from 'typeorm-typedi-extensions'
import { User } from './User'
import { EntityManager, Repository } from 'typeorm'
import { Credential } from './Credential'

@Service()
export class AccountContext {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Credential) private credentialRepository: Repository<Credential>,
  ) {}

  async createAccount(username, password) {
    const credential = new Credential({ passwordDigest: password })
    await this.credentialRepository.insert(credential)

    const user = new User({ username, credential })
    await this.userRepository.insert(user)

    return user
  }
}
