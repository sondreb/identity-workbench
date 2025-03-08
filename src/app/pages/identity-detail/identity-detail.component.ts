import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { IdentityService } from '../../services/identity.service';
import { CredentialService } from '../../services/credential.service';
import { Identity } from '../../models/identity.model';
import { Credential } from '../../models/credential.model';

@Component({
  selector: 'app-identity-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './identity-detail.component.html',
  styleUrls: ['./identity-detail.component.css']
})
export class IdentityDetailComponent implements OnInit {
  identity?: Identity;
  isEditMode = false;
  editedName = '';
  editedDescription = '';
  relatedCredentials: Credential[] = [];
  jsonView = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private identityService: IdentityService,
    private credentialService: CredentialService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadIdentity(id);
    });
  }

  loadIdentity(id: string) {
    this.identity = this.identityService.getIdentityById(id);
    
    if (!this.identity) {
      this.showError('Identity not found');
      this.router.navigate(['/identities']);
      return;
    }
    
    this.editedName = this.identity.name || '';
    this.editedDescription = this.identity.description || '';
    
    // Format JSON for viewing
    if (this.identity.didDocument) {
      this.jsonView = JSON.stringify(this.identity.didDocument, null, 2);
    } else {
      const simpleDoc = {
        id: this.identity.id,
        method: this.identity.method,
        created: this.identity.created,
        publicKey: this.identity.publicKey
      };
      this.jsonView = JSON.stringify(simpleDoc, null, 2);
    }
    
    // Load related credentials
    this.credentialService.getAllCredentials().subscribe(creds => {
      this.relatedCredentials = creds.filter(
        cred => cred.issuer === this.identity?.id || cred.subject === this.identity?.id
      );
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    
    if (!this.isEditMode && this.identity) {
      // Reset form when canceling
      this.editedName = this.identity.name || '';
      this.editedDescription = this.identity.description || '';
    }
  }

  saveChanges() {
    if (!this.identity) return;
    
    try {
      this.identityService.updateIdentity(this.identity.id, {
        name: this.editedName,
        description: this.editedDescription
      });
      
      this.isEditMode = false;
      this.identity = this.identityService.getIdentityById(this.identity.id);
      this.showSuccess('Identity information updated');
    } catch (error) {
      this.showError('Failed to update identity');
    }
  }

  deleteIdentity() {
    if (!this.identity) return;
    
    if (confirm(`Are you sure you want to delete the identity "${this.identity.name}"?`)) {
      this.identityService.deleteIdentity(this.identity.id);
      this.router.navigate(['/identities']);
      this.showSuccess('Identity deleted');
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => this.showSuccess('Copied to clipboard'),
      () => this.showError('Failed to copy')
    );
  }
  
  getRelationshipType(credential: Credential): string {
    if (!this.identity) return '';
    
    if (credential.issuer === this.identity.id) {
      return 'Issued';
    } else if (credential.subject === this.identity.id) {
      return 'Received';
    } else {
      return 'Related';
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
