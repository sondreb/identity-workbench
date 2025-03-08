import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CredentialService } from '../../services/credential.service';
import { IdentityService } from '../../services/identity.service';
import { Credential } from '../../models/credential.model';
import { Identity } from '../../models/identity.model';
import { ImportCredentialDialogComponent } from './import-credential-dialog/import-credential-dialog.component';

@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent {
  credentials: Credential[] = [];
  identities: Identity[] = [];
  searchTerm = '';
  filterType = 'all';
  filterIssuer = 'all';

  constructor(
    private credentialService: CredentialService,
    private identityService: IdentityService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadCredentials();
    this.loadIdentities();
  }

  loadCredentials() {
    this.credentialService.getAllCredentials().subscribe(creds => {
      this.credentials = creds;
    });
  }

  loadIdentities() {
    this.identityService.getAllIdentities().subscribe(ids => {
      this.identities = ids;
    });
  }

  get filteredCredentials(): Credential[] {
    return this.credentials.filter(cred => {
      // Search filter
      const searchMatch = !this.searchTerm || 
        cred.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cred.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cred.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cred.type.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Type filter
      const typeMatch = this.filterType === 'all' || cred.type === this.filterType;
      
      // Issuer filter
      const issuerMatch = this.filterIssuer === 'all' || cred.issuer === this.filterIssuer;
      
      return searchMatch && typeMatch && issuerMatch;
    });
  }

  getIdentityName(id: string): string {
    const identity = this.identities.find(i => i.id === id);
    return identity?.name || 'Unknown';
  }
  
  getCredentialStatus(credential: Credential): string {
    if (credential.revoked) {
      return 'revoked';
    }
    
    if (credential.expirationDate && new Date(credential.expirationDate) < new Date()) {
      return 'expired';
    }
    
    return 'valid';
  }

  truncateId(id: string): string {
    if (id.length <= 30) return id;
    return id.substring(0, 15) + '...' + id.substring(id.length - 10);
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportCredentialDialogComponent, {
      width: '600px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCredentials();
      }
    });
  }
  
  deleteCredential(id: string) {
    if (confirm('Are you sure you want to delete this credential?')) {
      this.credentialService.deleteCredential(id);
      this.snackBar.open('Credential deleted', 'Close', {
        duration: 3000,
        panelClass: 'success-snackbar'
      });
    }
  }

  clearFilters() {
    this.searchTerm = '';
    this.filterType = 'all';
    this.filterIssuer = 'all';
  }
}
