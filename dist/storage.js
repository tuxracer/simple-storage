"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    SimpleStorage.prototype.setItem = function (key, rawValue) {
        var value = JSON.stringify(rawValue);
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
        var data = {};
        for (var i = this.length - 1; i >= 0; i--) {
            var key = this.storageSource.key(i);
            if (key) {
                data[key] = this.getItem(key);
            }
        }
        return data;
    };
    SimpleStorage.prototype.getAllItemsAsync = function () {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(function () { return resolve(_this.getAllItems()); }); });
    };
    return SimpleStorage;
}());
exports.SimpleStorage = SimpleStorage;
;
exports.simpleSessionStorage = new SimpleStorage("session");
exports.simpleLocalStorage = new SimpleStorage("local");
