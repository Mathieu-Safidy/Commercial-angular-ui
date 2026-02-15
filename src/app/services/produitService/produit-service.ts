import { inject, Injectable } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  http = inject(Utils);
  
  public async getProduits() {
    return await this.http.PGet('/produits');
  }
}
