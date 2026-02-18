import { inject, Injectable, signal } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  http = inject(Utils);
  
  produits = signal<Produit[]>([]);
  prduitSelectionne = signal<Produit | null>(null);

  public async initializeProduits() {
    if (this.produits().length === 0) {
      const produits = await this.getProduits();
      this.produits.set(produits as Produit[]);
    }
    return this.produits;
  }

  public async getProduitById(id: string) {
    return await this.http.PGet(`/produits/${id}`);
  }

  public async reloadProduits() {
    this.produits.set([]);
    await this.initializeProduits();
    return this.produits();
  }
  
  public async getProduits() {
    return await this.http.PGet('/produits');
  }
}
