import bcrypt from 'bcryptjs'
import { Service } from 'typedi'

@Service()
export class EncryptionService {
  private saltRounds = 10

  async hash(secret) {
    return await bcrypt.hash(secret, this.saltRounds)
  }

  async compare(secret, hash) {
    return await bcrypt.compare(hash)
  }
}
