import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="nav-header">
      <div class="nav-logo-container">
        <img src="/icons/icon-152x152.png" alt="Identity Workbench Logo" class="nav-logo"
             (error)="handleImageError($event)">
      </div>
    </div>
    <mat-nav-list class="nav-list">
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link">
        <mat-icon>dashboard</mat-icon>
        <span>Dashboard</span>
      </a>
      <a mat-list-item routerLink="/identities" routerLinkActive="active-link">
        <mat-icon>person</mat-icon>
        <span>Identities</span>
      </a>
      <a mat-list-item routerLink="/credentials" routerLinkActive="active-link">
        <mat-icon>verified_user</mat-icon>
        <span>Credentials</span>
      </a>
      <a mat-list-item routerLink="/issue" routerLinkActive="active-link">
        <mat-icon>add_circle</mat-icon>
        <span>Issue Credential</span>
      </a>
      <a mat-list-item routerLink="/verify" routerLinkActive="active-link">
        <mat-icon>check_circle</mat-icon>
        <span>Verify Credential</span>
      </a>
      <mat-divider class="nav-divider"></mat-divider>
      <a mat-list-item routerLink="/settings" routerLinkActive="active-link">
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </a>
    </mat-nav-list>
  `,
  styles: `
    .nav-header {
      padding: 24px 16px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    .nav-logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: #f8f8f8;
      overflow: hidden;
      border: 1px solid #e0e0e0;
    }
    
    .nav-logo {
      width: 75px;
      height: 75px;
    }
    
    .nav-icon-fallback {
      font-size: 40px;
      color: var(--primary-color);
    }
    
    .nav-list {
      padding-top: 0;
    }
    
    .nav-list a {
      color: var(--text-color);
      margin: 5px 0;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }
    
    .nav-list a:hover {
      background-color: rgba(0, 120, 212, 0.05);
    }
    
    .nav-list a mat-icon {
      color: var(--primary-color);
      margin-right: 16px;
    }
    
    .active-link {
      background-color: rgba(0, 120, 212, 0.1) !important;
      border-left: 3px solid var(--primary-color) !important;
    }
    
    .nav-divider {
      margin: 8px 0;
      background-color: rgba(0, 0, 0, 0.1);
    }
  `
})
export class NavigationComponent {
  handleImageError(event: any) {
    // Replace the image with a material icon if it fails to load
    const img = event.target;
    const parent = img.parentNode;
    img.style.display = 'none';
    
    // Create a material icon as fallback
    const icon = document.createElement('mat-icon');
    icon.innerText = 'account_balance_wallet';
    icon.className = 'nav-icon-fallback';
    parent.appendChild(icon);
  }
}
