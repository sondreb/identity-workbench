import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings, ThemeSettings, PrivacySettings, AdvancedSettings } from '../models/types.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly SETTINGS_KEY = 'identity-workbench-settings';
  
  private themeChangeSubject = new BehaviorSubject<string>('dark');
  public themeChange$ = this.themeChangeSubject.asObservable();

  constructor() {
    // Initialize theme from stored settings
    const settings = this.getSettings();
    this.themeChangeSubject.next(settings.appearance.theme);
  }

  getSettings(): AppSettings {
    const defaultSettings: AppSettings = {
      appearance: {
        theme: 'dark',
        accentColor: '#00c3ff'
      },
      privacy: {
        storePrivateKeys: true,
        autoVerify: true
      },
      advanced: {
        resolverEndpoint: 'https://resolver.identity.foundation/',
        enableDebugMode: false
      }
    };
    
    const storedSettings = localStorage.getItem(this.SETTINGS_KEY);
    
    if (!storedSettings) {
      return defaultSettings;
    }
    
    try {
      const parsedSettings = JSON.parse(storedSettings);
      return { ...defaultSettings, ...parsedSettings };
    } catch (e) {
      console.error('Failed to parse settings', e);
      return defaultSettings;
    }
  }
  
  saveSettings(settings: AppSettings): void {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    
    // Notify theme change if it's changed
    this.themeChangeSubject.next(settings.appearance.theme);
  }
  
  resetSettings(): AppSettings {
    const defaultSettings: AppSettings = {
      appearance: {
        theme: 'dark',
        accentColor: '#00c3ff'
      },
      privacy: {
        storePrivateKeys: true,
        autoVerify: true
      },
      advanced: {
        resolverEndpoint: 'https://resolver.identity.foundation/',
        enableDebugMode: false
      }
    };
    
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(defaultSettings));
    
    // Notify theme change
    this.themeChangeSubject.next(defaultSettings.appearance.theme);
    
    return defaultSettings;
  }
  
  getTheme(): string {
    return this.getSettings().appearance.theme;
  }

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error parsing stored item:', error);
      return null;
    }
  }

  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing item:', error);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
  
  /**
   * Gets all application data for export
   * @returns An object containing all stored data
   */
  getAllData(): any {
    // Create an object to hold all data
    const allData: any = {
      settings: this.getSettings(),
      identities: [],
      credentials: [],
      metadata: {
        version: '1.0.0',
        exportDate: new Date().toISOString()
      }
    };
    
    // Get all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || key === this.SETTINGS_KEY) continue;
      
      try {
        // Try to parse the data
        const data = this.get(key);
        
        // Categorize data by prefix or structure (this is an example, adjust as needed)
        if (key.startsWith('identity-')) {
          allData.identities.push({ key, data });
        } else if (key.startsWith('credential-')) {
          allData.credentials.push({ key, data });
        } else {
          // Store other data in a separate category
          if (!allData.other) allData.other = [];
          allData.other.push({ key, data });
        }
      } catch (error) {
        console.error(`Error retrieving data for key ${key}`, error);
      }
    }
    
    return allData;
  }
  
  /**
   * Imports data from an export file
   * @param importedData The data to import
   */
  importData(importedData: any): void {
    if (!importedData || typeof importedData !== 'object') {
      throw new Error('Invalid import data format');
    }
    
    // Import settings if present
    if (importedData.settings) {
      this.saveSettings({
        ...this.getSettings(), // Current settings as fallback
        ...importedData.settings // Override with imported settings
      });
    }
    
    // Import identities
    if (Array.isArray(importedData.identities)) {
      importedData.identities.forEach((item: any) => {
        if (item.key && item.data) {
          this.set(item.key, item.data);
        }
      });
    }
    
    // Import credentials
    if (Array.isArray(importedData.credentials)) {
      importedData.credentials.forEach((item: any) => {
        if (item.key && item.data) {
          this.set(item.key, item.data);
        }
      });
    }
    
    // Import other data
    if (Array.isArray(importedData.other)) {
      importedData.other.forEach((item: any) => {
        if (item.key && item.data) {
          this.set(item.key, item.data);
        }
      });
    }
  }
}
