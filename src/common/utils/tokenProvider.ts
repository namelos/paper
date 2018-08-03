import { localStorageProvider } from 'browser/utils/localStorageProvider'

const TOKEN_KEY = 'TOKEN'

export const tokenProvider = {
  get() {
    return localStorageProvider.get(TOKEN_KEY)
  },
  set(value) {
    return localStorageProvider.set(TOKEN_KEY, value)
  }
}
