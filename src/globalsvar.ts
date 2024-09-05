// globalStore.ts

class GlobalStore {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private _data: { [key: string]: any } = {};

  public set<T>(key: string, value: T): void {
    this._data[key] = value;
  }

  public get<T>(key: string): T | undefined {
    return this._data[key] as T;
  }
}

// Export a single instance
export const globalStore = new GlobalStore();
