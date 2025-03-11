import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard'
  },
  { 
    path: 'identities', 
    loadComponent: () => import('./pages/identities/identities.component').then(m => m.IdentitiesComponent),
    title: 'Identities'
  },
  { 
    path: 'identity/:id', 
    loadComponent: () => import('./pages/identity-detail/identity-detail.component').then(m => m.IdentityDetailComponent),
    title: 'Identity Detail'
  },
  { 
    path: 'credentials', 
    loadComponent: () => import('./pages/credentials/credentials.component').then(m => m.CredentialsComponent),
    title: 'Credentials'
  },
  { 
    path: 'credential/:id', 
    loadComponent: () => import('./pages/credential-detail/credential-detail.component').then(m => m.CredentialDetailComponent),
    title: 'Credential Detail'
  },
  { 
    path: 'issue', 
    loadComponent: () => import('./pages/issue-credential/issue-credential.component').then(m => m.IssueCredentialComponent),
    title: 'Issue Credential'
  },
  { 
    path: 'verify', 
    loadComponent: () => import('./pages/verify-credential/verify-credential.component').then(m => m.VerifyCredentialComponent),
    title: 'Verify Credential'
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
    title: 'Settings'
  },
  { path: '**', redirectTo: '/dashboard' }
];
