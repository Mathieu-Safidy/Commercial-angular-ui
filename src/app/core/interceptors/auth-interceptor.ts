import { HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, Observable } from 'rxjs';
import { AuthServices } from '../../services/authService/auth.services';

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

      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(retryReq);
          }),
          catchError(() => throwError(() => error))
        );
      }

      return throwError(() => error);
    })
  );
};
