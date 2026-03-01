import { inject, Injectable } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class BoutiqueService {
  private http = inject(Utils);

  public async getBoutiqueByUserId(userId: string) {
    return await this.http.PGet(`/boutiques/user/${userId}`) as Boutique;
  }

  public async getAllBoutiques() {
    return await this.http.PGet('/boutiques');
  }



}
