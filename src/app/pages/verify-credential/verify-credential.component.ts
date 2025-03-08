import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { CredentialService } from '../../services/credential.service';
import { IdentityService } from '../../services/identity.service';
import { Identity } from '../../models/identity.model';

@Component({
  selector: 'app-verify-credential',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatStepperModule
  ],
  templateUrl: './verify-credential.component.html',
  styleUrls: ['./verify-credential.component.css']
})
export class VerifyCredentialComponent {
  credentialJson = '';
  verificationResult: { valid: boolean; message: string } | null = null;
  credentialData: any = null;
  issuerIdentity: Identity | undefined;
  subjectIdentity: Identity | undefined;
  
  // Add Object to make it available in the template
  Object = Object;

  constructor(
    private credentialService: CredentialService,
    private identityService: IdentityService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.credentialJson = e.target?.result as string;
    };
    
    reader.readAsText(file);
  }

  verifyCredential() {
    if (!this.credentialJson) {
      this.showError('Please enter a credential to verify');
      return;
    }

    try {
      const vcData = JSON.parse(this.credentialJson);
      this.credentialData = vcData;
      
      // Verify the credential
      this.verificationResult = this.credentialService.verifyCredential(vcData);
      
      // Look up issuer and subject identities if we have them
      if (vcData.issuer) {
        const issuerId = typeof vcData.issuer === 'string' ? vcData.issuer : vcData.issuer.id;
        this.issuerIdentity = this.identityService.getIdentityById(issuerId);
      }
      
      if (vcData.credentialSubject && vcData.credentialSubject.id) {
        this.subjectIdentity = this.identityService.getIdentityById(vcData.credentialSubject.id);
      }

    } catch (error) {
      this.verificationResult = { 
        valid: false,
        message: 'Invalid JSON format'
      };
      this.credentialData = null;
    }
  }

  importCredential() {
    if (!this.credentialData) {
      this.showError('No valid credential to import');
      return;
    }

    const result = this.credentialService.importCredential(this.credentialData);
    
    if (result) {
      this.showSuccess('Credential imported successfully');
    } else {
      this.showError('Failed to import credential');
    }
  }

  clearForm() {
    this.credentialJson = '';
    this.verificationResult = null;
    this.credentialData = null;
    this.issuerIdentity = undefined;
    this.subjectIdentity = undefined;
  }

  getCredentialType(): string {
    if (!this.credentialData || !this.credentialData.type) {
      return 'Unknown';
    }

    if (Array.isArray(this.credentialData.type)) {
      return this.credentialData.type.length > 1 
        ? this.credentialData.type[1] 
        : this.credentialData.type[0];
    }

    return this.credentialData.type;
  }

  getIssuanceDate(): string {
    if (!this.credentialData || !this.credentialData.issuanceDate) {
      return 'Not specified';
    }
    
    try {
      return new Date(this.credentialData.issuanceDate).toLocaleString();
    } catch {
      return this.credentialData.issuanceDate;
    }
  }

  getExpiryDate(): string {
    if (!this.credentialData || !this.credentialData.expirationDate) {
      return 'Not specified';
    }
    
    try {
      return new Date(this.credentialData.expirationDate).toLocaleString();
    } catch {
      return this.credentialData.expirationDate;
    }
  }

  isCredentialExpired(): boolean {
    if (!this.credentialData || !this.credentialData.expirationDate) {
      return false;
    }
    
    try {
      const expiryDate = new Date(this.credentialData.expirationDate);
      return expiryDate < new Date();
    } catch {
      return false;
    }
  }

  formatJson(json: any): string {
    return JSON.stringify(json, null, 2);
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
