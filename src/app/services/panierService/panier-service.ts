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
  public backendLink = Environments.BACKEND || "http://localhost:3000";

  authService = inject(AuthServices);
  user: User | any = this.authService.currentUserSubject.value || { } ;
  userId = this.user._id;

  public async getPanier(idUSer: string) {
    return await this.http.PGet(`/paniers/actif/${idUSer}`);
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
  public async deleteFromPanier(idDetail: number) {
    await this.removeFromPanier(idDetail);
    await this.reloadPanier();
    return this.panier();
  }
}
