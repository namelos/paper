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
    return this.generateToken(user)
  }

  async login(username, password) {
    const user = await this.userRepository.findOne({ username })
    if(!user) return null

    const match = await this.encryptionService.compare(password, user.credential.passwordDigest)
    if(!match) return null

    return this.generateToken(user)
  }

  async getUserByToken(token) {
    const id = await this.verifyToken(token)
    return await this.userRepository.findOne(id)
  }

  private async verifyToken(token) {
    return await this.tokenService.verify(token)
  }

  private async generateToken(user: User) {
    return await this.tokenService.sign(user.id)
  }
}
