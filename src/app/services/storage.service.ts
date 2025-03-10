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
}
