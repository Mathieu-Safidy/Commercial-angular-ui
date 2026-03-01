import { HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, Observable, from } from 'rxjs';
import { AuthServices } from '../../services/authService/auth.services';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const authService = inject(AuthServices);

  const accessToken = authService.getAccessToken();
  
  
  // Ajouter le token à chaque requête
  let authReq = req;
  if (accessToken) {
    
    

    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
  }

  return next(authReq).pipe(
    
    catchError((error  ): Observable<HttpEvent<any>> => {
      if (req.url.includes('/auth/refresh')) {
        authService.logout();
      }
      if (error.status === 401) {
        return from(authService.refreshToken()).pipe(
          switchMap((newToken) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(retryReq); // next.handle renvoie un Observable
          }),
          catchError(() => throwError(() => error))
        );
      }

      return throwError(() => error);
    })
  );
};
