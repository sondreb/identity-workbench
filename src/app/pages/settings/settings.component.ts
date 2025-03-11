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
import { IdentityService } from '../../services/identity.service';
import { CredentialService } from '../../services/credential.service';

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
    private snackBar: MatSnackBar,
    private identityService: IdentityService,
    private credentialService: CredentialService
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
    const IDENTITIES_KEY = 'identity-workbench-identities';
    const CREDENTIALS_KEY = 'identity-workbench-credentials';
    
    // Get identities and credentials from storage
    const identities = this.storageService.get<any[]>(IDENTITIES_KEY) || [];
    const credentials = this.storageService.get<any[]>(CREDENTIALS_KEY) || [];
    
    // Calculate total storage usage
    let totalStorage = 0;
    
    // Add size of settings
    const settingsStr = localStorage.getItem(this.storageService.SETTINGS_KEY);
    if (settingsStr) {
      totalStorage += settingsStr.length * 2; // Approximate size in bytes (UTF-16 encoding)
    }
    
    // Add size of identities
    const identitiesStr = localStorage.getItem(IDENTITIES_KEY);
    if (identitiesStr) {
      totalStorage += identitiesStr.length * 2;
    }
    
    // Add size of credentials
    const credentialsStr = localStorage.getItem(CREDENTIALS_KEY);
    if (credentialsStr) {
      totalStorage += credentialsStr.length * 2;
    }
    
    // Format the total storage size
    let formattedSize: string;
    if (totalStorage < 1024) {
      formattedSize = `${totalStorage} B`;
    } else if (totalStorage < 1024 * 1024) {
      formattedSize = `${(totalStorage / 1024).toFixed(1)} KB`;
    } else {
      formattedSize = `${(totalStorage / (1024 * 1024)).toFixed(1)} MB`;
    }
    
    // Update the stats
    this.statCount = {
      identities: identities.length,
      credentials: credentials.length,
      totalStorage: formattedSize
    };
  }

  importData(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // Import the data
        if (data.identities) {
          this.storageService.set('identity-workbench-identities', data.identities);
        }
        
        if (data.credentials) {
          this.storageService.set('identity-workbench-credentials', data.credentials);
        }
        
        if (data.settings) {
          this.storageService.set('identity-workbench-settings', data.settings);
          this.loadSettings();
        }
        
        // Refresh the services to update in-memory data
        this.identityService.loadFromStorage();
        this.credentialService.loadFromStorage();
        
        // Update stats after import
        this.calculateStats();
        
        this.showSuccess('Data imported successfully');
      } catch (error) {
        this.showError('Failed to import data: Invalid format');
      }
    };
    
    reader.readAsText(file);
  }

  exportAllData(): void {
    try {
      // Retrieve all app data from storage service
      const allData = this.storageService.getAllData();
      
      // Convert data to JSON string
      const jsonData = JSON.stringify(allData, null, 2);
      
      // Create a blob with the data
      const blob = new Blob([jsonData], { type: 'application/json' });
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      a.download = `identity-workbench-export-${timestamp}.json`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      this.snackBar.open('Data exported successfully', 'Close', {
        duration: 3000,
        panelClass: 'success-snackbar'
      });
    } catch (error) {
      console.error('Export error:', error);
      this.snackBar.open('Failed to export data', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
    }
  }

  clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
      // Clear all data from storage
      this.storageService.clear();
      
      // Reset settings to default
      this.resetSettings();
      this.saveSettings();
      
      // Refresh the services to update in-memory state
      this.identityService.loadFromStorage();
      this.credentialService.loadFromStorage();
      
      // Update stats after clearing
      this.calculateStats();
      
      this.showSuccess('All data has been cleared');
    }
  }

  applyTheme(theme: 'dark' | 'light' | 'system'): void {
    this.settings.appearance.theme = theme;
    this.saveSettings();
  }

  /**
   * Shows a success message snackbar
   */
  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
  }

  /**
   * Shows an error message snackbar
   */
  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }
}
