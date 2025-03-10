import { Component, OnInit } from '@angular/core';
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
  deferredPrompt: any;
  showInstallButton = false;
  title = 'Identity Workbench';
  currentTheme = 'dark';
  updateAvailable = false;

  constructor(private storageService: StorageService, private pwaService: PwaService) {}

  ngOnInit() {
    // Listen for theme changes
    this.storageService.themeChange$.subscribe(theme => {
      this.applyTheme(theme);
    });
    
    // Apply initial theme
    this.applyTheme(this.storageService.getTheme());
    
    // Check for PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67+ from automatically showing the prompt
      e.preventDefault();
      // Store the event for later use
      this.deferredPrompt = e;
      // Show install button
      this.showInstallButton = true;
    });

    // Subscribe to install prompt events
    this.pwaService.installPromptEvent$.subscribe(canInstall => {
      this.showInstallButton = canInstall;
    });
    
    // Subscribe to update availability
    this.pwaService.updateAvailable$.subscribe(hasUpdate => {
      this.updateAvailable = hasUpdate;
    });
    
    // Check for updates on init
    this.pwaService.checkForUpdates();
  }

  // async installPwa() {
  //   if (!this.deferredPrompt) return;
    
  //   this.deferredPrompt.prompt();
  //   const { outcome } = await this.deferredPrompt.userChoice;
    
  //   if (outcome === 'accepted') {
  //     this.showInstallButton = false;
  //   }
  //   this.deferredPrompt = null;
  // }
  
  applyTheme(theme: string) {
    this.currentTheme = theme;
    
    // Apply theme class to the document body
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  installPwa() {
    this.pwaService.promptInstall();
  }
  
  updateApp() {
    this.pwaService.updateApp();
  }
}
