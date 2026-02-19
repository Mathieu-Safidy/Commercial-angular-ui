import { inject, Injectable } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class StockService {
    http = inject(Utils);

    public async approvisionnerProduit(idProduit: string, quantite: number) {
      return await this.http.PPost(`/stocks/approvisionner`, {
        idProduit,
        quantite
      });
    }
}
