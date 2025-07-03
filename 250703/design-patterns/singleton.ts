// Singleton Exercises
// 1. Global Settings Manager

class SettingsManager {
  private static instance: SettingsManager;
  private settings: Map<string, string>;

  private constructor() {
    this.settings = new Map<string, string>();
  }

  static getInstance(): SettingsManager {
    if (!SettingsManager.instance)
      SettingsManager.instance = new SettingsManager();
    return SettingsManager.instance;
  }

  get(key: string): string | undefined {
    return this.settings.get(key);
  }

  set(key: string, value: string): void {
    this.settings.set(key, value);
  }

  clear(): void {
    this.settings.clear();
  }
}

SettingsManager.getInstance().set('theme', 'dark');
console.log(SettingsManager.getInstance().get('theme')); // Output: 'dark'
SettingsManager.getInstance().clear();
console.log(SettingsManager.getInstance().get('theme')); // Output: 'undefined'
