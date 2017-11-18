export declare type SimpleStorageType = "session" | "local";
export declare class SimpleStorage {
    private storageSource;
    constructor(storageType: SimpleStorageType);
    setItem(key: string, rawValue: any): void;
    getItem(key: string): any;
    removeItem(key: string): void;
    clear(): void;
}
export declare const simpleSessionStorage: SimpleStorage;
export declare const simpleLocalStorage: SimpleStorage;
