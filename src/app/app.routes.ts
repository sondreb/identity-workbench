import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard - Identity Workbench'
  },
  { 
    path: 'identities', 
    loadComponent: () => import('./pages/identities/identities.component').then(m => m.IdentitiesComponent),
    title: 'Identities - Identity Workbench'
  },
  { 
    path: 'identity/:id', 
    loadComponent: () => import('./pages/identity-detail/identity-detail.component').then(m => m.IdentityDetailComponent),
    title: 'Identity Detail - Identity Workbench'
  },
  { 
    path: 'credentials', 
    loadComponent: () => import('./pages/credentials/credentials.component').then(m => m.CredentialsComponent),
    title: 'Credentials - Identity Workbench'
  },
  { 
    path: 'credential/:id', 
    loadComponent: () => import('./pages/credential-detail/credential-detail.component').then(m => m.CredentialDetailComponent),
    title: 'Credential Detail - Identity Workbench'
  },
  { 
    path: 'issue', 
    loadComponent: () => import('./pages/issue-credential/issue-credential.component').then(m => m.IssueCredentialComponent),
    title: 'Issue Credential - Identity Workbench'
  },
  { 
    path: 'verify', 
    loadComponent: () => import('./pages/verify-credential/verify-credential.component').then(m => m.VerifyCredentialComponent),
    title: 'Verify Credential - Identity Workbench'
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
    title: 'Settings - Identity Workbench'
  },
  { path: '**', redirectTo: '/dashboard' }
];
