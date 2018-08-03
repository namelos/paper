import { Service } from 'typedi'
import jwt from 'jsonwebtoken'

@Service()
export class TokenService {
  private key = 'SUPER_SECRET'

  sign(obj) {
    return new Promise((resolve, reject) => {
      return jwt.sign(obj, this.key, (error, encoded) => {
        if (error) return reject(error)
        return resolve(encoded)
      })
    })

  }

  verify(token) {
    return new Promise((resolve, reject) => {
      return jwt.verify(token, this.key, (error, decoded) => {
        if (error) return reject(error)
        return resolve(decoded)
      })
    })
  }
}
