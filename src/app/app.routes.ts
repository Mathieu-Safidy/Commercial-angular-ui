import { Routes } from '@angular/router';
import { roleGuard } from './guard/roleGuard';
import { defaultRedirectGuard } from './guard/defaultRedirectGuard';

export const routes: Routes = [
{ 
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/inscription').then(m => m.RegisterClientComponent),
    },
    {
        path: 'access-denied',
        loadComponent: () => import('./features/auth/acces-denied/acces-denied').then(m => m.AccessDeniedComponent),
    },
    {
        path: 'acceuil',
        loadComponent: () => import('./features/racine/home').then(m => m.Home),
        canActivate: [roleGuard(['User', 'Admin', 'Boutique'])],
        children: [
          {
            path: 'client',
            loadComponent: () => import('./features/client/clientDashboard/ClientDashboard').then(m => m.ClientDashboardComponent),
            canActivate: [roleGuard(['User'])]
          },
          {
            path: 'boutique',
            loadComponent: () => import('./features/boutique/boutiqueDashboard/BoutiqueDashBoard').then(m => m.BoutiqueDashboardComponent),
            canActivate: [roleGuard(['Boutique'])]
          },
          {
            path: 'admin',
            loadComponent: () => import('./features/admin/adminDashboard/AdminDashBoard').then(m => m.AdminDashboardComponent),
            canActivate: [roleGuard(['Admin'])]
          },
          {
            path: '',
            canActivate: [defaultRedirectGuard],
            component: class {}
          }
        ]
    },
    {
    path: '',
    canActivate: [defaultRedirectGuard],
    component: class {}
  },
  {
    path: '**',
    redirectTo: '/acceuil',
  }
];
