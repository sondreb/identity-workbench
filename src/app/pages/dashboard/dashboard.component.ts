import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IdentityService } from '../../services/identity.service';
import { CredentialService } from '../../services/credential.service';
import { Identity } from '../../models/identity.model';
import { Credential } from '../../models/credential.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  identities: Identity[] = [];
  credentials: Credential[] = [];

  constructor(
    private identityService: IdentityService,
    private credentialService: CredentialService,
    private router: Router
  ) {
    this.identityService.getAllIdentities().subscribe(ids => {
      this.identities = ids;
    });

    this.credentialService.getAllCredentials().subscribe(creds => {
      this.credentials = creds;
    });
  }
  
  // Method to handle keyboard navigation
  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
