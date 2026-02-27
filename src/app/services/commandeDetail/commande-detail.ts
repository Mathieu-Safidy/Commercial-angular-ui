import { inject, Injectable } from '@angular/core';
import {Utils} from '../utils/utils';
import { jwtDecode } from 'jwt-decode';
import { AuthServices } from '../authService/auth.services';

@Injectable({
  providedIn: 'root',
})
export class CommandeDetailService {
  private baseUrl = '/commandeDetails';
  authService = inject(AuthServices);

  constructor(private utils: Utils) {}

  public async getAll() {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      const decoded = jwtDecode<{ exp: number }>(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = (decoded.exp || 0) - currentTime;
  
      console.log(`Token expires in ${timeLeft} seconds`);
    }
    return this.utils.PGet(this.baseUrl);
  }
  public async getByCommandeId(idCommande: string) {
    return this.utils.PGet(`${this.baseUrl}/commande/${idCommande}`);
  }
}
