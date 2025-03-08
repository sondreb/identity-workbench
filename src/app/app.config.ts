import { ApplicationConfig, isDevMode, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// Function to initialize the Material icon registry
export function initializeApp(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
  return () => {
    // Set default Material icon set
    matIconRegistry.setDefaultFontSetClass('material-icons');
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [MatIconRegistry, DomSanitizer],
      multi: true
    }
  ]
};
