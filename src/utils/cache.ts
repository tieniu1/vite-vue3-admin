class LocalCache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getCache(key: string) {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : item;
  }
  deleteCache(key: string) {
    localStorage.removeItem(key);
  }
  clearCache() {
    localStorage.clear();
  }
}

export default new LocalCache();
