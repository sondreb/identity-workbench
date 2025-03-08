import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { Identity } from '../../models/identity.model';
import { ImportIdentityDialogComponent } from './import-identity-dialog/import-identity-dialog.component';

@Component({
  selector: 'app-identities',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './identities.component.html',
  styleUrls: ['./identities.component.css']
})
export class IdentitiesComponent {
  identities: Identity[] = [];
  searchTerm = '';
  
  constructor(
    private identityService: IdentityService,
    private dialog: MatDialog
  ) {
    this.loadIdentities();
  }
  
  loadIdentities() {
    this.identityService.getAllIdentities().subscribe(ids => {
      this.identities = ids;
    });
  }
  
  get filteredIdentities(): Identity[] {
    if (!this.searchTerm) return this.identities;
    
    const term = this.searchTerm.toLowerCase();
    return this.identities.filter(identity => 
      identity.id.toLowerCase().includes(term) || 
      identity.name?.toLowerCase().includes(term) ||
      identity.description?.toLowerCase().includes(term)
    );
  }
  
  openImportDialog() {
    const dialogRef = this.dialog.open(ImportIdentityDialogComponent, {
      width: '600px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIdentities();
      }
    });
  }
  
  deleteIdentity(id: string) {
    if (confirm('Are you sure you want to delete this identity?')) {
      this.identityService.deleteIdentity(id);
    }
  }
  
  getMethodLogo(method: string): string {
    switch (method) {
      case 'key': return 'vpn_key';
      case 'web': return 'language';
      case 'stellar': return 'star';
      case 'is': return 'public';
      default: return 'person';
    }
  }
  
  truncateId(id: string): string {
    if (id.length <= 30) return id;
    return id.substring(0, 15) + '...' + id.substring(id.length - 10);
  }
}
