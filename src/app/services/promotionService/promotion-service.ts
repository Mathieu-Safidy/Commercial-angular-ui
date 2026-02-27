import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
    private baseUrl = '/promotions';
  
    constructor(private utils: Utils) {}

    public async createPromotion(promotionData: any) {
        return this.utils.PPost(this.baseUrl, promotionData);
    }
    public async getPromotionsByProductId(idProduit: string) {
        return this.utils.PGet(`${this.baseUrl}/produit/${idProduit}`);
    }
  
}
