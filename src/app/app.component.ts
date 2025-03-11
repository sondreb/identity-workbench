import { Component, OnInit, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { StorageService } from './services/storage.service';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NavigationComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showInstallButton = false;
  title = 'Identity Workbench';
  currentTheme = 'dark';

  constructor(private storageService: StorageService, public pwaService: PwaService) {
    // Use effect to monitor update availability changes
    effect(() => {
      console.log('Update available status changed:', this.pwaService.updateAvailable());
    });
  }

  ngOnInit() {
    // Listen for theme changes
    this.storageService.themeChange$.subscribe(theme => {
      this.applyTheme(theme);
    });
    
    // Apply initial theme
    this.applyTheme(this.storageService.getTheme());
    
    // Subscribe to install prompt events
    this.pwaService.installPromptEvent$.subscribe(canInstall => {
      this.showInstallButton = canInstall;
    });
    
    // Check for updates on init
    this.pwaService.checkForUpdates().then(hasUpdate => {
      console.log('Initial update check result:', hasUpdate);
    });
  }
  
  applyTheme(theme: string) {
    this.currentTheme = theme;
    
    // Apply theme class to the document body
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  installPwa() {
    this.pwaService.promptInstall();
  }
  
  updateApp() {
    this.pwaService.updateApp();
  }
}
