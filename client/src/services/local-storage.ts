export const LocalStorageService = new class {
  private storage: Storage

  get<TValue>(key: string): TValue {
    const item = this.storage.getItem(key)
    return item ? (JSON.parse(item) as TValue) : undefined
  }

  set<TValue>(key: string, value: TValue) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }
}()
