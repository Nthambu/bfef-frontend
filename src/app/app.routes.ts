import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'leadership',
    loadComponent: () =>
      import('./pages/leadership/leadership.component').then(
        (m) => m.LeadershipComponent,
      ),
  },
  {
    path: 'constitution',
    loadComponent: () =>
      import('./pages/constitution/constitution.component').then(
        (m) => m.ConstitutionComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
