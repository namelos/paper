import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { User } from './User'
import { Credential } from './Credential'
import { EncryptionService } from 'libs/EncryptionService'
import { TokenService } from 'libs/TokenService'

@Service()
export class AccountContext {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Credential) private credentialRepository: Repository<Credential>,
    private encryptionService: EncryptionService,
    private tokenService: TokenService
  ) {}

  async createAccount(username, password) {
    const passwordDigest = await this.encryptionService.hash(password)
    const credential = new Credential({ passwordDigest })
    await this.credentialRepository.insert(credential)

    const user = new User({ username, credential })
    await this.userRepository.insert(user)
    return user
  }
}
