import { Injectable, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  // Replace BehaviorSubject with signal
  updateAvailable = signal<boolean>(false);
  
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
        .subscribe(event => {
          console.log('New version available', event);
          this.updateAvailable.set(true);
        });
    }
  }

  checkForUpdates(): Promise<boolean> {
    if (!this.swUpdate.isEnabled) {
      return Promise.resolve(false);
    }
    
    return this.swUpdate.checkForUpdate()
      .then(hasUpdate => {
        console.log('Manual check for update result:', hasUpdate);
        if (hasUpdate) {
          this.updateAvailable.set(true);
        }
        return hasUpdate;
      })
      .catch(err => {
        console.error('Failed to check for updates:', err);
        return false;
      });
  }

  updateApp(): Promise<boolean> {
    if (!this.swUpdate.isEnabled) {
      return Promise.resolve(false);
    }
    
    return this.swUpdate.activateUpdate().then(success => {
      if (success) {
        console.log('Update activated successfully');
        this.updateAvailable.set(false);
        window.location.reload();
      }
      return success;
    }).catch(err => {
      console.error('Failed to activate update:', err);
      return false;
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
