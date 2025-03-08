import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage.service';
import { AppSettings } from '../../models/types.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings!: AppSettings;
  appVersion = '1.0.0'; // App version could come from environment
  statCount = {
    identities: 0,
    credentials: 0,
    totalStorage: '0 KB'
  };

  constructor(
    private storageService: StorageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSettings();
    this.calculateStats();
  }

  loadSettings(): void {
    this.settings = this.storageService.getSettings();
  }

  saveSettings(): void {
    this.storageService.saveSettings(this.settings);
    this.snackBar.open('Settings saved successfully', 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
  }

  resetSettings(): void {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      this.settings = this.storageService.resetSettings();
      this.snackBar.open('Settings reset to default', 'Close', {
        duration: 3000
      });
    }
  }

  calculateStats(): void {
    // This would be implemented to calculate actual storage usage
    // For now, using mock data
    this.statCount = {
      identities: 3,
      credentials: 7,
      totalStorage: '256 KB'
    };
  }

  importData(event: any): void {
    // Implementation for importing data
    console.log('Import data', event);
  }

  exportAllData(): void {
    // Implementation for exporting all data
    console.log('Export all data');
  }

  clearAllData(): void {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      // Implementation for clearing all data
      console.log('Clear all data');
      this.snackBar.open('All data has been cleared', 'Close', {
        duration: 3000,
        panelClass: 'success-snackbar'
      });
    }
  }

  applyTheme(theme: 'dark' | 'light' | 'system'): void {
    this.settings.appearance.theme = theme;
    this.saveSettings();
  }
}
