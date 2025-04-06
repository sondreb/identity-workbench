import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IdentityService } from '../../services/identity.service';
import { CredentialService } from '../../services/credential.service';
import { Identity } from '../../models/identity.model';
import { CREDENTIAL_TYPES } from '../../models/credential.model';
import { v4 as uuidv4 } from 'uuid';
import * as didJWT from 'did-jwt';
import { createVerifiableCredentialJwt, Issuer } from 'did-jwt-vc';
import { StrKey } from '@sondreb/did-stellar';

@Component({
  selector: 'app-issue-credential',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatStepperModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDividerModule,
    MatAutocompleteModule
  ],
  templateUrl: './issue-credential.component.html',
  styleUrls: ['./issue-credential.component.css']
})
export class IssueCredentialComponent implements OnInit {
  identities: Identity[] = [];
  identitiesWithPrivateKey: Identity[] = [];
  filteredSubjectOptions: Identity[] = [];
  credentialTypes = CREDENTIAL_TYPES;
  formStep = 0;

  // Form fields
  credentialName = '';
  credentialDescription = '';
  selectedType = 'VerifiableCredential';
  selectedIssuer = '';
  subjectId = '';
  expirationDate: Date | undefined = undefined;
  claimFields: { name: string; value: string }[] = [{ name: '', value: '' }];
  
  previewJson = '';
  
  constructor(
    private identityService: IdentityService,
    private credentialService: CredentialService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadIdentities();
  }

  loadIdentities() {
    this.identityService.getAllIdentities().subscribe(ids => {
      this.identities = ids;
      // Filter identities with private keys that can be used for signing
      this.identitiesWithPrivateKey = ids.filter(id => id.privateKey);
      
      if (this.identitiesWithPrivateKey.length > 0) {
        this.selectedIssuer = this.identitiesWithPrivateKey[0].id;
      }
      
      // Initialize filtered subject options with all identities
      this.filteredSubjectOptions = [...this.identities];
    });
  }

  addClaimField() {
    this.claimFields.push({ name: '', value: '' });
  }

  removeClaimField(index: number) {
    if (this.claimFields.length > 1) {
      this.claimFields.splice(index, 1);
    }
  }

  nextStep() {
    if (this.formStep === 0 && this.validateStep1()) {
      this.formStep = 1;
      this.updatePreview();
    } else if (this.formStep === 1 && this.validateStep2()) {
      this.formStep = 2;
      this.updatePreview();
    }
  }

  previousStep() {
    this.formStep = Math.max(0, this.formStep - 1);
  }

  validateStep1(): boolean {
    if (!this.credentialName) {
      this.showError('Please enter a name for the credential');
      return false;
    }
    
    if (!this.selectedType) {
      this.showError('Please select a credential type');
      return false;
    }
    
    if (!this.selectedIssuer) {
      this.showError('Please select an issuer identity');
      return false;
    }
    
    return true;
  }

  validateStep2(): boolean {
    if (!this.subjectId || !this.subjectId.startsWith('did:')) {
      this.showError('Please enter a valid subject DID');
      return false;
    }
    
    // Check if all claim fields are filled
    const invalidClaims = this.claimFields.filter(claim => !claim.name || !claim.value);
    if (invalidClaims.length > 0) {
      this.showError('Please fill in all claim fields or remove empty ones');
      return false;
    }
    
    return true;
  }

  updatePreview() {
    const credentialSubject: any = { id: this.subjectId };
    
    // Add all claims to the subject
    this.claimFields.forEach(claim => {
      if (claim.name && claim.value) {
        credentialSubject[claim.name] = claim.value;
      }
    });
    
    const currentDate = new Date();
    const credential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1'
      ],
      id: `urn:uuid:${uuidv4()}`,
      type: ['VerifiableCredential', this.selectedType],
      issuer: this.selectedIssuer,
      issuanceDate: currentDate.toISOString(),
      expirationDate: this.expirationDate ? this.expirationDate.toISOString() : undefined,
      credentialSubject
    };
    
    this.previewJson = JSON.stringify(credential, null, 2);
  }

  getIssuerName(id: string): string {
    const identity = this.identities.find(i => i.id === id);
    return identity?.name || 'Unknown';
  }

  issueCredential() {
    try {
      // Parse the preview JSON to create the credential
      const vcData = JSON.parse(this.previewJson);

      // Find the issuer identity to get the private key
      const issuerIdentity = this.identitiesWithPrivateKey.find(id => id.id === this.selectedIssuer);
      
      if (!issuerIdentity || !issuerIdentity.privateKey) {
        this.showError('Issuer private key not found');
        return;
      }

      let privateKey: any = undefined;
      let signer: any = undefined;
      let alg = 'ES256K';

      if (issuerIdentity.method === 'stellar') {
        privateKey = StrKey.decodeEd25519SecretSeed(issuerIdentity.privateKey);
        signer = didJWT.EdDSASigner(privateKey);
        alg = 'EdDSA';
      } else {
        throw new Error('Unsupported DID method.');

        // Create a signer function using the issuer's private key
          const signer = didJWT.ES256KSigner(privateKey);
          alg = 'ES256K';
          // const signer = didJWT.ES256KSigner(didJWT.hexToBytes(issuerIdentity.privateKey.replace('0x', '')));
          
      }
      // Create an issuer object with the signer
      const issuer: Issuer = {
        did: this.selectedIssuer,
        signer: signer,
        alg: alg // The algorithm used for signing
      };
      
      // Create the JWT payload for the verifiable credential
      const vcPayload: any = {
        sub: this.subjectId,
        nbf: Math.floor(Date.now() / 1000),
        vc: {
          '@context': vcData['@context'],
          type: vcData.type,
          credentialSubject: vcData.credentialSubject
        }
      };
      
      // If an expiration date is specified, add it to the payload
      if (this.expirationDate) {
        vcPayload['exp'] = Math.floor(this.expirationDate.getTime() / 1000);
      }
      
      // Create and sign the Verifiable Credential JWT
      createVerifiableCredentialJwt(vcPayload, issuer).then(jwt => {
        // Decode the JWT to get the payload (for display purposes)
        const decoded = didJWT.decodeJWT(jwt);
        
        // Combine the credential data with our application-specific metadata
        const newCredential = this.credentialService.addCredential({
          id: vcData.id,
          type: this.selectedType,
          issuer: this.selectedIssuer,
          issuanceDate: new Date(),
          expirationDate: this.expirationDate,
          subject: this.subjectId,
          credentialSubject: vcData.credentialSubject,
          rawCredential: vcData,
          name: this.credentialName,
          description: this.credentialDescription,
          jwt: jwt,             // Store the JWT format
          decodedJwt: decoded   // Store the decoded JWT payload for easy access
        });
        
        this.showSuccess('Credential issued successfully');
        this.router.navigate(['/credential', newCredential.id]);
      }).catch(error => {
        this.showError(`Failed to sign credential: ${error.message}`);
        console.error('Signing error:', error);
      });
      
    } catch (error) {
      this.showError('Failed to issue credential');
      console.error('Issue credential error:', error);
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

  filterSubjectOptions(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    
    if (!value) {
      this.filteredSubjectOptions = [...this.identities];
      return;
    }
    
    this.filteredSubjectOptions = this.identities.filter(identity => 
      identity.id.toLowerCase().includes(value) || 
      identity.name?.toLowerCase().includes(value)
    );
  }
  
  selectIdentityAsSubject(identity: Identity): void {
    this.subjectId = identity.id;
  }

  displaySubjectFn(id: string): string {
    if (!id) return '';
    const identity = this.identities.find(i => i.id === id);
    return identity ? `${identity.name} (${identity.id})` : id;
  }
}
