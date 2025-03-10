import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
    RouterModule
  ],
  template: `
    <mat-toolbar class="header" [ngClass]="{'light-header': currentTheme === 'light'}">
      <button mat-icon-button (click)="toggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
      <a [routerLink]="['/']" class="title-container">
        <img src="/icons/icon-152x152.png" alt="Identity Workbench Logo" class="toolbar-logo">
        <span class="title neon-text">{{title}}</span>
      </a>
      <span class="spacer"></span>
      <button mat-icon-button aria-label="Help">
        <mat-icon>help_outline</mat-icon>
      </button>
      @if (showInstallButton) {
        <button mat-icon-button class="install-button" (click)="installPwa()">
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
      background-color: #1a1a1a;
      box-shadow: 0 2px 10px rgba(0, 195, 255, 0.2);
      z-index: 100;
      position: relative;
    }

    .light-header {
      background-color: #f0f0f0; /* Slightly darker background for better contrast */
      box-shadow: 0 2px 10px rgba(0, 102, 170, 0.2);
    }

    .title {
      font-weight: 300;
      letter-spacing: 0.5px;
      font-size: 1.5rem;
      color: inherit;
    }

    .light-header .title {
      color: #0066aa; /* Ensure title has good contrast in light mode */
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
  `
})
export class HeaderComponent {
  @Input() title = 'Identity Workbench';
  @Input() showInstallButton = false;
  @Output() toggleSidenavEvent = new EventEmitter<void>();
  @Output() installPwaEvent = new EventEmitter<void>();
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
}
