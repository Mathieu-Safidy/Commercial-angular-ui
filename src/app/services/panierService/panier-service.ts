import { inject, Injectable, signal } from '@angular/core';
import { Utils } from '../utils/utils';
import { Environments } from '../../environements/environments';
import {AuthServices} from '../authService/auth.services';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private http = inject(Utils);
  public panier = signal<any>(null);
  public panierTermine = signal<any>(null);
  public backendLink = Environments.BACKEND || "http://localhost:3000";

  authService = inject(AuthServices);
  user: User | any = this.authService.currentUserSubject.value || { } ;
  userId = this.user._id;

  public async getPanier(idUSer: string) {
    try {
      const result = await this.http.PGet(`/paniers/actif/${idUSer}`);
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
      throw error;
    }
  }

  public async getPanierTermine(idUSer: string) {
    try {
      const result = await this.http.PGet(`/paniers/termine/${idUSer}`);
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération du panier terminé:", error);
      throw error;
    }
  }
  // public async addToPanier(idDetail: number, idProduit: number, quantite: number) {
  //     return await this.http.PPost(`/paniers/add/details/${idDetail}`, { idProduit, quantite });
  // }
  public async addToPanier(iduser: string, idProduit: string, quantite: number) {
    return await this.http.PPost(`/paniers/add/details/${iduser}`, { idProduit, quantite });
  }
  public async updatePanierDetail(idDetail: number, quantite: number) {
    return await this.http.PPatch(`/paniers/modify/details/${idDetail}`, { quantite });
  }
  public async removeFromPanier(idDetail: number) {
    return await this.http.PDelete(`/paniers/delete/details/${idDetail}`);
  }
  public async reloadPanier() {
    this.panier.set(null);
    await this.initializePanier();
    return this.panier();
  }
  
  public async reloadPanierTermine() {
    this.panierTermine.set(null);
    await this.initializePaniertermine();
    return this.panierTermine();
  }
  public async initializePanier() {
    let panier: Panier = null as any;
    if (this.panier()) {
      panier = this.panier() as Panier;
    } else {
      panier = (await this.getPanier(this.userId)) as Panier;
      this.panier.set(panier);
    }
    return this.panier();
  }
  public async initializePaniertermine() {
    let panier: Panier = null as any;
    if (this.panierTermine()) {
      panier = this.panierTermine() as Panier;
    } else {
      panier = (await this.getPanierTermine(this.userId)) as Panier;
      this.panierTermine.set(panier);
    }
    return this.panierTermine();
  }


  public async deleteFromPanier(idDetail: number) {
    await this.removeFromPanier(idDetail);
    await this.reloadPanier();
    return this.panier();
  }
}
