import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Utils } from '../utils/utils';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  constructor() {
    const userJson = localStorage.getItem('currentUser');
    const token = localStorage.getItem('accessToken');

    if (userJson && userJson !== "undefined" && token) {
      console.log(userJson);
      
      const parsed = userJson ? JSON.parse(userJson) : null;
      this.currentUserSubject.next(parsed);
      this.accessTokenSubject.next(token);
    }
  }

  public async login(email: string, password: string, role: string) {
    try {
      const result: any = await this.http.PPost('/auth/login', { email, password, role });

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

      // window.location.reload();
      this.router.navigate(['/login']);
    } catch (error) {
      throw new Error('Logout failed');
    }
  }

  async refreshToken() {
    try {
      const result: any = await this.http.PPost('/auth/refresh-token', {});
      console.log('result', result);
      
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
