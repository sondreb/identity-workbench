import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTooltipModule
  ],
  template: `
    <mat-toolbar class="header" [ngClass]="{'light-header': currentTheme === 'light'}">
      <button mat-icon-button (click)="toggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
      <a [routerLink]="['/']" class="title-container">
        <img src="/icons/icon-152x152.png" alt="Identity Workbench Logo" class="toolbar-logo">
        <span class="title">{{title}}</span>
      </a>
      <span class="spacer"></span>
      <button mat-icon-button aria-label="Help">
        <mat-icon>help_outline</mat-icon>
      </button>
      @if (updateAvailable) {
        <button mat-icon-button class="update-button" (click)="updateApp()" aria-label="Update application" matTooltip="Update available">
          <mat-icon>system_update</mat-icon>
        </button>
      }
      @if (showInstallButton) {
        <button mat-icon-button class="install-button" (click)="installPwa()" matTooltip="Install app">
          <mat-icon>get_app</mat-icon>
        </button>
      }
    </mat-toolbar>
  `,
  styles: `
  .title-container {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-left: 16px;
  }

  .toolbar-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .header {
    background-color: #2b2b2b;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    z-index: 100;
    position: relative;
  }

  .light-header {
    background-color: #f0f0f0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-weight: 400;
    letter-spacing: 0.5px;
    font-size: 1.5rem;
    color: white;
  }

  .light-header .title {
    color: var(--primary-color);
  }

  .spacer {
    flex: 1 1 auto;
  }

  mat-icon {
    color: var(--primary-color);
  }

  .install-button {
    margin-left: 8px;
  }
    
  .update-button {
    margin-left: 8px;
    animation: update-pulse 2s infinite;
  }
    
  @keyframes update-pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
  `
})
export class HeaderComponent {
  @Input() title = 'Identity Workbench';
  @Input() showInstallButton = false;
  @Input() updateAvailable = false;
  @Output() toggleSidenavEvent = new EventEmitter<void>();
  @Output() installPwaEvent = new EventEmitter<void>();
  @Output() updateAppEvent = new EventEmitter<void>();
  currentTheme = 'dark';

  constructor(private storageService: StorageService) {
    this.storageService.themeChange$.subscribe(theme => {
      this.currentTheme = theme;
    });
    this.currentTheme = this.storageService.getTheme();
  }

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }

  installPwa() {
    this.installPwaEvent.emit();
  }
  
  updateApp() {
    this.updateAppEvent.emit();
  }
}
