"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
/** Fallback storage provider for environments where the Storage API isn't available */
var AltStorage = /** @class */ (function () {
    function AltStorage() {
        this.data = {};
    }
    AltStorage.prototype.getItem = function (key) {
        return this.data[key] || null;
    };
    AltStorage.prototype.setItem = function (key, value) {
        this.data[key] = value;
    };
    AltStorage.prototype.removeItem = function (key) {
        delete this.data[key];
    };
    AltStorage.prototype.clear = function () {
        this.data = {};
    };
    AltStorage.prototype.getData = function () {
        return this.data;
    };
    AltStorage.prototype.key = function (index) {
        return Object.keys(this.data)[index];
    };
    Object.defineProperty(AltStorage.prototype, "length", {
        get: function () {
            return Object.keys(this.data).length;
        },
        enumerable: true,
        configurable: true
    });
    return AltStorage;
}());
;
var SimpleStorage = /** @class */ (function () {
    function SimpleStorage(storageType) {
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
    SimpleStorage.prototype.setItem = function (key, rawValue) {
        var value = typeof rawValue === "string" ? rawValue : JSON.stringify(rawValue);
        this.storageSource.setItem(key, value);
    };
    SimpleStorage.prototype.getItem = function (key) {
        var value = this.storageSource.getItem(key);
        if (typeof value !== "string") {
            return value;
        }
        try {
            return JSON.parse(value);
        }
        catch (error) {
            return value;
        }
    };
    SimpleStorage.prototype.removeItem = function (key) {
        return this.storageSource.removeItem(key);
    };
    /** Remove all items from storage */
    SimpleStorage.prototype.clear = function () {
        return this.storageSource.clear();
    };
    Object.defineProperty(SimpleStorage.prototype, "length", {
        get: function () {
            return this.storageSource.length;
        },
        enumerable: true,
        configurable: true
    });
    SimpleStorage.prototype.getAllItems = function () {
        var items = [];
        for (var i = this.length - 1; i >= 0; i--) {
            var item = {};
            var key = this.storageSource.key(i);
            if (key !== null) {
                var value = this.getItem(key);
                items.push({ key: key, value: value });
            }
        }
        return items;
    };
    SimpleStorage.prototype.getAllItemsAsync = function () {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(function () { return resolve(_this.getAllItems()); }); });
    };
    SimpleStorage.prototype.isLocalAndSessionStorageSupported = function () {
        var key = "_simple-storage_test-key";
        try {
            // Disabling cookies can cause access to window.sessionStorage or window.localStorage to throw an exception
            if (typeof window === "undefined" || !window.sessionStorage || !window.localStorage) {
                return false;
            }
            // iOS in private mode causes exceptions when trying to write a new storage object, see
            // https://stackoverflow.com/questions/14555347/html5-localstorage-error-with-safari-quota-exceeded-err-dom-exception-22-an
            window.sessionStorage.setItem(key, "1");
            window.sessionStorage.removeItem(key);
        }
        catch (error) {
            return false;
        }
        return true;
    };
    return SimpleStorage;
}());
exports.SimpleStorage = SimpleStorage;
;
exports.simpleSessionStorage = new SimpleStorage("session");
exports.simpleLocalStorage = new SimpleStorage("local");
