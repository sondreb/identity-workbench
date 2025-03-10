import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private updateAvailable = new BehaviorSubject<boolean>(false);
  updateAvailable$ = this.updateAvailable.asObservable();
  
  private installPrompt: any;
  private installPromptEvent = new BehaviorSubject<boolean>(false);
  installPromptEvent$ = this.installPromptEvent.asObservable();

  constructor(private swUpdate: SwUpdate) {
    this.initializeServiceWorker();
    this.handleBeforeInstallPrompt();
  }

  private initializeServiceWorker(): void {
    if (this.swUpdate.isEnabled) {
      // Check for new version on app initialization
      this.swUpdate.checkForUpdate();
      
      // Set up periodic checks (every 6 hours)
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 6 * 60 * 60 * 1000);
      
      // Subscribe to version updates
      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          this.updateAvailable.next(true);
          console.log('New version available');
        });
    }
  }

  checkForUpdates(): Promise<boolean> {
    if (!this.swUpdate.isEnabled) {
      return Promise.resolve(false);
    }
    
    return this.swUpdate.checkForUpdate().then(hasUpdate => {
      if (hasUpdate) {
        this.updateAvailable.next(true);
      }
      return hasUpdate;
    });
  }

  updateApp(): Promise<boolean> {
    if (!this.swUpdate.isEnabled) {
      return Promise.resolve(false);
    }
    
    return this.swUpdate.activateUpdate().then(success => {
      if (success) {
        window.location.reload();
      }
      return success;
    });
  }

  private handleBeforeInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later
      this.installPrompt = event;
      this.installPromptEvent.next(true);
    });
  }

  promptInstall(): Promise<boolean> {
    if (!this.installPrompt) {
      return Promise.resolve(false);
    }

    // Show the install prompt
    this.installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    return this.installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        this.installPromptEvent.next(false);
        this.installPrompt = null;
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    });
  }
}
