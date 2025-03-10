import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { CredentialService } from '../../services/credential.service';
import { IdentityService } from '../../services/identity.service';
import { Credential } from '../../models/credential.model';
import { Identity } from '../../models/identity.model';

@Component({
  selector: 'app-credential-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './credential-detail.component.html',
  styleUrls: ['./credential-detail.component.css']
})
export class CredentialDetailComponent implements OnInit {
  credential?: Credential;
  issuer?: Identity;
  subject?: Identity;
  isEditMode = false;
  editedName = '';
  editedDescription = '';
  jsonView = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private credentialService: CredentialService,
    private identityService: IdentityService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadCredential(id);
    });
  }

  loadCredential(id: string) {
    this.credential = this.credentialService.getCredentialById(id);
    
    if (!this.credential) {
      this.showError('Credential not found');
      this.router.navigate(['/credentials']);
      return;
    }
    
    this.editedName = this.credential.name || '';
    this.editedDescription = this.credential.description || '';
    
    // Format JSON for viewing
    this.jsonView = JSON.stringify(this.credential.rawCredential, null, 2);
    
    // Load issuer and subject identities if available
    if (this.credential.issuer) {
      this.issuer = this.identityService.getIdentityById(this.credential.issuer);
    }
    
    if (this.credential.subject) {
      this.subject = this.identityService.getIdentityById(this.credential.subject);
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    
    if (!this.isEditMode && this.credential) {
      // Reset form when canceling
      this.editedName = this.credential.name || '';
      this.editedDescription = this.credential.description || '';
    }
  }

  saveChanges() {
    if (!this.credential) return;
    
    try {
      this.credentialService.updateCredential(this.credential.id, {
        name: this.editedName,
        description: this.editedDescription
      });
      
      this.isEditMode = false;
      this.credential = this.credentialService.getCredentialById(this.credential.id);
      this.showSuccess('Credential information updated');
    } catch (error) {
      this.showError('Failed to update credential');
    }
  }

  deleteCredential() {
    if (!this.credential) return;
    
    if (confirm(`Are you sure you want to delete the credential "${this.credential.name}"?`)) {
      this.credentialService.deleteCredential(this.credential.id);
      this.router.navigate(['/credentials']);
      this.showSuccess('Credential deleted');
    }
  }

  revokeCredential() {
    if (!this.credential) return;
    
    if (confirm(`Are you sure you want to revoke the credential "${this.credential.name}"?`)) {
      this.credentialService.revokeCredential(this.credential.id);
      this.credential = this.credentialService.getCredentialById(this.credential.id);
      this.showSuccess('Credential revoked');
    }
  }

  getCredentialStatus(): string {
    if (!this.credential) return '';

    if (this.credential.revoked) {
      return 'revoked';
    }
    
    if (this.credential.expirationDate && new Date(this.credential.expirationDate) < new Date()) {
      return 'expired';
    }
    
    return 'valid';
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => this.showSuccess('Copied to clipboard'),
      () => this.showError('Failed to copy')
    );
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  downloadCredential() {
    if (!this.credential) return;
    
    try {
      const jsonDocument = {
        vc: this.credential.rawCredential,
        decoded: this.credential.decodedJwt,
        jwt: this.credential.jwt
      };

      const jsonData = JSON.stringify(jsonDocument, null, 2);

      const blob = new Blob([jsonData], { type: 'application/json' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Set the filename with the credential name or a default
      const filename = `${this.credential.name || 'credential'}-${this.credential.id}.json`;
      a.download = filename;
      
      // Trigger the download
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
      
      this.showSuccess('Credential download started');
    } catch (error) {
      this.showError('Failed to download credential');
      console.error('Download error:', error);
    }
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
