export class InMemoryDatabase<T> {
  private data: Map<string, T>;

  constructor() {
    this.data = new Map<string, T>();
  }

  // Create or update an entry
  set(key: string, value: T): void {
    this.data.set(key, value);
  }

  // Retrieve an entry by key
  get(key: string): T | undefined {
    return this.data.get(key);
  }

  // Delete an entry by key
  delete(key: string): boolean {
    return this.data.delete(key);
  }

  // Check if a key exists
  has(key: string): boolean {
    return this.data.has(key);
  }

  // Retrieve all entries
  getAll(): T[] {
    return Array.from(this.data.values());
  }

  // Clear the database
  clear(): void {
    this.data.clear();
  }
}
