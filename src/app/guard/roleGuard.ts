// src/app/core/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/authService/auth.services';
import { map, take, tap } from 'rxjs/operators';

export const roleGuard = (requiredRoles: string[]): CanActivateFn => {
  const roleMap: { [key: string]: string[] } = {
    'Admin': ['Admin'],
    'Boutique': ['Boutique'],
    'User': ['User']
  };
  return (route, state) => {
    const authService = inject(AuthServices);
    const router = inject(Router);

    return authService.currentUser$.pipe(
      take(1),
      map(user => {
        // si pas connecté ou rôle incorrect → false
        if (!user) return false;
        if (!user.role || !requiredRoles.includes(user.role)) return false;
        return true;
      }),
      tap(canActivate => {
        if (!canActivate) {
          const user = authService.currentUserSubject.value; // récupère l'utilisateur actuel
          console.log('User actuel ',user);
          
          if (!user) {
            router.navigate(['/login']);
          } else {
            router.navigate(['/access-denied']);
          }
        }
      })
    );
  };
};