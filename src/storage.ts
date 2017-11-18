export type SimpleStorageType = "session" | "local";

interface StringDictionary {
  [key: string]: string;
};

/** Fallback storage provider for environments where localStorage isn't available */
class AltStorage {
  private data: StringDictionary = {}

  getItem(key: string) {
    return this.data[key] || null;
  }

  setItem(key: string, value: string) {
    this.data[key] = value;
  }

  removeItem(key: string) {
    delete this.data[key];
  }

  clear() {
    this.data = {};
  }
};

export class SimpleStorage {
  private storageSource: WindowLocalStorage["localStorage"]
    | WindowSessionStorage["sessionStorage"]
    | AltStorage;

  constructor(storageType: SimpleStorageType) {
    if (typeof window === "undefined" || !window.sessionStorage) {
      this.storageSource = new AltStorage();
      return;
    }

    if (storageType === "session") {
      this.storageSource = window.sessionStorage;
      return;
    }

    if (storageType === "local") {
      this.storageSource = window.localStorage;
      return;
    }
  }

  setItem(key: string, rawValue: any) {
    const value = JSON.stringify(rawValue);
    this.storageSource.setItem(key, value);
  }

  getItem(key: string) {
    const value = this.storageSource.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return value;
  }

  removeItem(key: string) {
    return this.storageSource.removeItem(key);
  }

  clear() {
    return this.storageSource.clear();
  }
};

export const simpleSessionStorage = new SimpleStorage("session");
export const simpleLocalStorage = new SimpleStorage("local");
