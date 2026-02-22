import { Injectable } from '@angular/core';
import {Utils} from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class CommandeDetailService {
  private baseUrl = '/commandeDetails';

  constructor(private utils: Utils) {}

  public async getAll() {
    return this.utils.PGet(this.baseUrl);
  }
  public async getByCommandeId(idCommande: string) {
    return this.utils.PGet(`${this.baseUrl}/commande/${idCommande}`);
  }
}
