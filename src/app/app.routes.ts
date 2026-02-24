import { Routes } from '@angular/router';

export const routes: Routes = [
{ 
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
        // canActivate: [roleGuard('admin')]
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/inscription').then(m => m.RegisterClientComponent),
    },
    {
        path: 'acceuil',
        loadComponent: () => import('./features/racine/home').then(m => m.Home),
    },
    {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // TOUT LE RESTE → redirige vers login
  // (y compris /auth, /acceuil, /dashboard, /truc, etc.)
  {
    path: '**',
    redirectTo: '/login'
  }
];
