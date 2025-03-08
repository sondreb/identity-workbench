import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar class="header" [ngClass]="{'light-header': currentTheme === 'light'}">
      <button mat-icon-button (click)="toggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="title neon-text">{{title}}</span>
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
    .header {
      background-color: #1a1a1a;
      box-shadow: 0 2px 10px rgba(0, 195, 255, 0.2);
      z-index: 100;
      position: relative;
    }

    .light-header {
      background-color: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 136, 204, 0.2);
    }

    .title {
      margin-left: 16px;
      font-weight: 300;
      letter-spacing: 0.5px;
      font-size: 1.5rem;
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
