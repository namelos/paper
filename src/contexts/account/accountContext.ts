import { EncryptionService } from 'contexts/utils/EncryptionService'
import { TokenService } from 'contexts/utils/TokenService'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Credential } from './Credential'
import { User } from './User'

@Service()
export class AccountContext {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Credential) private credentialRepository: Repository<Credential>,
    private encryptionService: EncryptionService,
    private tokenService: TokenService
  ) {}

  async get(id) {
    return await this.userRepository.findOne(id)
  }

  async createAccount(username, password) {
    const passwordDigest = await this.encryptionService.hash(password)

    const user = new User({
      username,
      credential: new Credential({ passwordDigest })
    })

    await this.userRepository.save(user)
    return this.generateToken(user)
  }

  async findByUserRelation(user: User, relation: string) {
    const u = await this.userRepository.findOne(user.id, { relations: [relation] });
    return u[relation]
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
    return await this.get(id)
  }

  private async verifyToken(token) {
    return await this.tokenService.verify(token)
  }

  private async generateToken(user: User) {
    return await this.tokenService.sign(user.id)
  }
}
