import { effect, inject, Injectable, signal } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  http = inject(Utils);
  
  produits = signal<Produit[]>([]);
  produitSelectionne = signal<Produit | null>(null);

  constructor() {
    effect(() => {
      console.log("Produit sélectionné:", this.produitSelectionne());
    })
  }

  public async initializeProduits() {
    if (this.produits().length === 0) {
      const produits = await this.getProduits();
      this.produits.set(produits as Produit[]);
    }
    return this.produits;
  }

  public async getProduitById(id: string) {
    return await this.http.PGet(`/produits/${id}`) as Produit;
  }

  public async getProduitsByBoutiqueId(idBoutique: string) {
    return await this.http.PGet(`/produits/boutique/${idBoutique}`) as Produit[];
  }

  public async reloadProduits() {
    this.produits.set([]);
    await this.initializeProduits();
    return this.produits();
  }
  
  public async getProduits() {
    return await this.http.PGet('/produits');
  }

  public async ajouterProduit(formData: FormData) {
    return await this.http.PPost('/produits', formData);
  }

  public async modifierProduit(id: string, formData: FormData) {
    return await this.http.PPatch(`/produits/${id}`, formData);
  }
}
