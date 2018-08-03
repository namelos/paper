export const localStorageProvider = {
  get(key) {
    const str = localStorage.getItem(key)
    try {
      return JSON.parse(str)
    } catch (e) {
      return ''
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
