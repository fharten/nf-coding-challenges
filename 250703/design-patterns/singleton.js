"use strict";
// Singleton Exercises
// 1. Global Settings Manager
class SettingsManager {
    constructor() {
        this.settings = new Map();
    }
    static getInstance() {
        if (!SettingsManager.instance)
            SettingsManager.instance = new SettingsManager();
        return SettingsManager.instance;
    }
    get(key) {
        return this.settings.get(key);
    }
    set(key, value) {
        this.settings.set(key, value);
    }
    clear() {
        this.settings.clear();
    }
}
SettingsManager.getInstance().set('theme', 'dark');
console.log(SettingsManager.getInstance().get('theme')); // Output: 'dark'
SettingsManager.getInstance().clear();
console.log(SettingsManager.getInstance().get('theme')); // Output: 'undefined'
