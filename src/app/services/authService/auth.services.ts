import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  public currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public accessTokenSubject = new BehaviorSubject<string | null>(null);
  public accessToken$ = this.accessTokenSubject.asObservable();

  isLoggedIn$: Observable<boolean> = this.accessToken$.pipe(map((token) => !!token));

  private http = inject(Utils);

  constructor() {
    const userJson = localStorage.getItem('currentUser');
    const token = localStorage.getItem('accessToken');

    if (userJson && token) {
      this.currentUserSubject.next(JSON.parse(userJson));
      this.accessTokenSubject.next(token);
    }
  }

  public async login(email: string, password: string) {
    try {
      const result: any = await this.http.PPost('/auth/login', { email, password });

      let user = result.user;
      if (user && user.idProfil) {
        user.role = user.idProfil.nom; // mappe idProfil.nom à user.role
        user.idProfil = undefined; // optionnel : supprime idProfil pour éviter la confusion
      }
      this.currentUserSubject.next(user);
      this.accessTokenSubject.next(result.accessToken);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('accessToken', result.accessToken);
      return user;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  public async register(payload: { email: string; password: string; username: string }) {
    try {
      const result: any = await this.http.PPost('/auth/register', payload, false);
      let user = result.user;
      if (user && user.idProfil) {
        user.role = user.idProfil.nom; // mappe idProfil.nom à user.role
        user.idProfil = undefined; // optionnel : supprime idProfil pour éviter la confusion
      }
      this.currentUserSubject.next(user);
      this.accessTokenSubject.next(result.accessToken);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('accessToken', result.accessToken);
      return user;
    } catch (error) {
      throw new Error('Registration failed');
    }
  }

  public async logout() {
    try {
      this.currentUserSubject.next(null);
      this.accessTokenSubject.next(null);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('accessToken');

      window.location.reload();
    } catch (error) {
      throw new Error('Logout failed');
    }
  }

  refreshToken() {
    try {
      const result: any = this.http.PPost('/auth/refresh-token', {});
      let user = result.user;
      if (user && user.idProfil) {
        user.role = user.idProfil.nom; // mappe idProfil.nom à user.role
        user.idProfil = undefined; // optionnel : supprime idProfil pour éviter la confusion
      }
      this.currentUserSubject.next(user);
      this.accessTokenSubject.next(result.accessToken);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('accessToken', result.accessToken);
      return result.accessToken;
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }

  setAccessToken(token: string): void {
    this.accessTokenSubject.next(token);
  }

  getAccessToken(): string | null {
    return this.accessTokenSubject.value;
  }
}
