export type SimpleStorageType = "session" | "local";

export interface SimpleStorageItem {
  key: string;
  value: any;
};

export interface StringDictionary {
  [key: string]: string;
};

/** Fallback storage provider for environments where the Storage API isn't available */
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

  getData() {
    return this.data;
  }

  key(index: number) {
    return Object.keys(this.data)[index];
  }

  get length() {
    return Object.keys(this.data).length;
  }
};

export class SimpleStorage {
  private storageSource: WindowLocalStorage["localStorage"]
    | WindowSessionStorage["sessionStorage"]
    | AltStorage;

  constructor(storageType: SimpleStorageType) {
    if (!this.isLocalAndSessionStorageSupported()) {
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
    const value = typeof rawValue === "string" ? rawValue : JSON.stringify(rawValue);
    this.storageSource.setItem(key, value);
  }

  getItem(key: string) {
    const value = this.storageSource.getItem(key);

    if (typeof value !== "string") {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  removeItem(key: string) {
    return this.storageSource.removeItem(key);
  }

  /** Remove all items from storage */
  clear() {
    return this.storageSource.clear();
  }

  get length() {
    return this.storageSource.length;
  }

  getAllItems() {
    const items: SimpleStorageItem[] = [];

    for(let i = this.length - 1; i >= 0; i--) {
      const item: any = {};
      const key = this.storageSource.key(i);

      if (key !== null) {
        const value = this.getItem(key);
        items.push({ key, value });
      }
    }

    return items;
  }

  getAllItemsAsync(): Promise<SimpleStorageItem[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this.getAllItems())));
  }

  private isLocalAndSessionStorageSupported(): boolean {
      const key = "_simple-storage_test-key";
      try {
        // Disabling cookies can cause access to window.sessionStorage or window.localStorage to throw an exception
        if (typeof window === "undefined" || !window.sessionStorage || !window.localStorage) {
          return false;
        }

        // iOS in private mode causes exceptions when trying to write a new storage object, see
        // https://stackoverflow.com/questions/14555347/html5-localstorage-error-with-safari-quota-exceeded-err-dom-exception-22-an
        window.sessionStorage.setItem(key, "1");
        window.sessionStorage.removeItem(key);
      } catch (error) {
        return false;
      }

      return true;
  }
};

export const simpleSessionStorage = new SimpleStorage("session");
export const simpleLocalStorage = new SimpleStorage("local");
