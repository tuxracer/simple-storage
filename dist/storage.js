"use strict";
exports.__esModule = true;
;
/** Fallback storage provider for environments where localStorage isn't available */
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
        if (value) {
            return JSON.parse(value);
        }
        return value;
    };
    SimpleStorage.prototype.removeItem = function (key) {
        return this.storageSource.removeItem(key);
    };
    SimpleStorage.prototype.clear = function () {
        return this.storageSource.clear();
    };
    return SimpleStorage;
}());
exports.SimpleStorage = SimpleStorage;
;
exports.simpleSessionStorage = new SimpleStorage("session");
exports.simpleLocalStorage = new SimpleStorage("local");
