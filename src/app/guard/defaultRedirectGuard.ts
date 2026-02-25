import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/authService/auth.services';
import { take, map } from 'rxjs/operators';

export const defaultRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {

      // 🔐 Pas connecté
      if (!user) {
        return router.createUrlTree(['/login']);
      }

      const roleRedirectMap: Record<string, string> = {
        Admin: '/acceuil/admin',
        Boutique: '/acceuil/boutique',
        User: '/acceuil/client'
      };

      const redirectPath = roleRedirectMap[user.role] || '/acceuil';

      return router.createUrlTree([redirectPath]);
    })
  );
};