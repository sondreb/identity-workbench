import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IdentityService } from '../../../services/identity.service';

@Component({
  selector: 'app-import-identity-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  templateUrl: './import-identity-dialog.component.html',
  styleUrls: ['./import-identity-dialog.component.css']
})
export class ImportIdentityDialogComponent {
  didString = '';
  stellarKey = '';
  jsonContent = '';
  privateKey = '';
  privateKeyName = '';
  isStellarPrivateKey = false;
  stellarKeyType = 'Unknown Key Type';
  
  // New FreeID properties
  freeIdDid = '';
  freeIdPrivateKey = '';
  freeIdImportType: 'did' | 'privateKey' = 'did';

  constructor(
    public dialogRef: MatDialogRef<ImportIdentityDialogComponent>,
    private identityService: IdentityService,
    private snackBar: MatSnackBar
  ) {}

  async importDID() {
    if (!this.didString) {
      this.showError('Please enter a valid DID');
      return;
    }

    const result = await this.identityService.importFromDIDString(this.didString);

    console.log('Result:', result);
    
    if (result) {
      this.showSuccess('DID imported successfully');
      this.dialogRef.close(true);
    } else {
      this.showError('Failed to import DID. Please check the format.');
    }
  }

  importStellar() {
    if (!this.stellarKey) {
      this.showError('Please enter a valid Stellar key');
      return;
    }

    const result = this.identityService.importFromStellarKey(this.stellarKey, this.isStellarPrivateKey);
    
    if (result) {
      this.showSuccess(`Stellar ${this.isStellarPrivateKey ? 'private' : 'public'} key imported successfully`);
      this.dialogRef.close(true);
    } else {
      this.showError(`Failed to import Stellar ${this.isStellarPrivateKey ? 'private' : 'public'} key. Please check the format.`);
    }
  }

  importJSON() {
    if (!this.jsonContent) {
      this.showError('Please enter valid JSON content');
      return;
    }

    try {
      const jsonData = JSON.parse(this.jsonContent);
      const result = this.identityService.importFromJsonFile(jsonData);
      
      if (result) {
        this.showSuccess('DID document imported successfully');
        this.dialogRef.close(true);
      } else {
        this.showError('Failed to import DID document. Invalid format.');
      }
    } catch (error) {
      this.showError('Invalid JSON format');
    }
  }

  importPrivateKey() {
    if (!this.privateKey || !this.privateKeyName) {
      this.showError('Please provide both a name and private key');
      return;
    }

    // In a real implementation, we'd extract the public key from the private key
    // For demo purposes, we'll create a simple did:key
    const newIdentity = this.identityService.addIdentity({
      method: 'key',
      publicKey: 'generated-from-private-key',
      privateKey: this.privateKey,
      name: this.privateKeyName,
      description: 'Identity with imported private key'
    });

    if (newIdentity) {
      this.showSuccess('Private key imported successfully');
      this.dialogRef.close(true);
    } else {
      this.showError('Failed to import private key');
    }
  }

  // async importFreeId() {
  //   if (this.freeIdImportType === 'did') {
  //     if (!this.freeIdDid || !this.freeIdDid.startsWith('did:is:')) {
  //       this.showError('Please enter a valid FreeID DID (did:is:...)');
  //       return;
  //     }
      
  //     const result = await this.identityService.importFromDIDString(this.freeIdDid);
      
  //     if (result) {
  //       this.showSuccess('FreeID DID imported successfully');
  //       this.dialogRef.close(true);
  //     } else {
  //       this.showError('Failed to import FreeID DID. Please check the format.');
  //     }
  //   } else {
  //     // Import using private key
  //     if (!this.freeIdPrivateKey) {
  //       this.showError('Please enter a valid FreeID private key');
  //       return;
  //     }
      
  //     try {
  //       // In a real implementation, we'd use the private key to generate the did:is identifier
  //       // For demo purposes, we'll create a simple did:is entry
  //       const newIdentity = this.identityService.addIdentity({
  //         method: 'is',
  //         publicKey: 'generated-from-freeid-private-key',
  //         privateKey: this.freeIdPrivateKey,
  //         name: 'FreeID Account',
  //         description: 'FreeID imported from private key'
  //       });

  //       if (newIdentity) {
  //         this.showSuccess('FreeID private key imported successfully');
  //         this.dialogRef.close(true);
  //       } else {
  //         this.showError('Failed to import FreeID private key');
  //       }
  //     } catch (error) {
  //       this.showError('Invalid FreeID private key format');
  //     }
  //   }
  // }

  onFileSelected(event: Event, type: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      
      if (type === 'json') {
        this.jsonContent = content;
      } else if (type === 'privateKey') {
        this.privateKey = content;
      }
    };
    
    reader.readAsText(file);
  }

  onStellarKeyInput() {
    const key = this.stellarKey.trim();
    
    if (!key) {
      this.stellarKeyType = 'Unknown Key Type';
      return;
    }
    
    // Detect key type based on prefix and length
    // Public keys typically start with 'G' and are 56 characters
    // Private keys typically start with 'S' and are 56 characters
    if (key.startsWith('S') && key.length === 56) {
      this.isStellarPrivateKey = true;
      this.stellarKeyType = 'Private Key';
    } else if (key.startsWith('G') && key.length === 56) {
      this.isStellarPrivateKey = false;
      this.stellarKeyType = 'Public Key';
    } else {
      this.stellarKeyType = 'Invalid Key Format';
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }
}
