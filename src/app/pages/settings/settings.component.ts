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
  settings = {
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

  appVersion = '0.1.0';
  statCount = {
    identities: 0,
    credentials: 0,
    totalStorage: '0 KB'
  };

  constructor(
    private storageService: StorageService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSettings();
    this.calculateStats();
  }

  loadSettings(): void {
    const savedSettings = this.storageService.get<any>('app-settings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...savedSettings };
    }
  }

  saveSettings(): void {
    this.storageService.set('app-settings', this.settings);
    this.showSuccess('Settings saved successfully');
  }

  resetSettings(): void {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      this.settings = {
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
      this.saveSettings();
    }
  }

  clearAllData(): void {
    if (confirm('WARNING: This will delete all your identities and credentials. This action cannot be undone. Continue?')) {
      this.storageService.clear();
      this.showSuccess('All data has been cleared');
      this.calculateStats();
    }
  }

  exportAllData(): void {
    try {
      // Collect all data from storage
      const identities = this.storageService.get('identity-workbench-identities') || [];
      const credentials = this.storageService.get('identity-workbench-credentials') || [];
      const settings = this.storageService.get('app-settings') || this.settings;
      
      // Create export object
      const exportData = {
        version: this.appVersion,
        exportDate: new Date().toISOString(),
        data: {
          identities,
          credentials,
          settings
        }
      };
      
      // Create and download export file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileName = `identity-workbench-export-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      linkElement.style.display = 'none';
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
      
      this.showSuccess('Data exported successfully');
    } catch (err) {
      this.showError('Failed to export data');
    }
  }

  importData(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        // Basic validation
        if (!importedData.data || !importedData.version) {
          throw new Error('Invalid import file format');
        }
        
        // Confirm import
        if (confirm(`This will import ${importedData.data.identities?.length || 0} identities and ${importedData.data.credentials?.length || 0} credentials. Continue?`)) {
          // Import identities
          if (importedData.data.identities?.length) {
            this.storageService.set('identity-workbench-identities', importedData.data.identities);
          }
          
          // Import credentials
          if (importedData.data.credentials?.length) {
            this.storageService.set('identity-workbench-credentials', importedData.data.credentials);
          }
          
          // Import settings
          if (importedData.data.settings) {
            this.storageService.set('app-settings', importedData.data.settings);
            this.loadSettings();
          }
          
          this.calculateStats();
          this.showSuccess('Data imported successfully');
        }
      } catch (err) {
        this.showError('Failed to import data: Invalid format');
      }
    };
    reader.readAsText(file);
  }

  calculateStats(): void {
    const identities = this.storageService.get<any[]>('identity-workbench-identities') || [];
    const credentials = this.storageService.get<any[]>('identity-workbench-credentials') || [];
    
    this.statCount.identities = identities.length;
    this.statCount.credentials = credentials.length;
    
    // Estimate storage usage
    try {
      let totalSize = 0;
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('identity-workbench')) {
          const item = localStorage.getItem(key) || '';
          totalSize += item.length * 2; // Approximate size in bytes (UTF-16 encoding)
        }
      }
      
      if (totalSize < 1024) {
        this.statCount.totalStorage = `${totalSize} B`;
      } else if (totalSize < 1024 * 1024) {
        this.statCount.totalStorage = `${(totalSize / 1024).toFixed(1)} KB`;
      } else {
        this.statCount.totalStorage = `${(totalSize / (1024 * 1024)).toFixed(1)} MB`;
      }
    } catch (e) {
      this.statCount.totalStorage = 'Unknown';
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }
}
