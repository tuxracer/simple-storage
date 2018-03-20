export declare type SimpleStorageType = "session" | "local";
export interface SimpleStorageItem {
    key: string;
    value: any;
}
export interface StringDictionary {
    [key: string]: string;
}
export declare class SimpleStorage {
    private storageSource;
    constructor(storageType: SimpleStorageType);
    setItem(key: string, rawValue: any): void;
    getItem(key: string): any;
    removeItem(key: string): void;
    /** Remove all items from storage */
    clear(): void;
    readonly length: number;
    getAllItems(): SimpleStorageItem[];
    getAllItemsAsync(): Promise<SimpleStorageItem[]>;
    private isLocalAndSessionStorageSupported();
}
export declare const simpleSessionStorage: SimpleStorage;
export declare const simpleLocalStorage: SimpleStorage;
