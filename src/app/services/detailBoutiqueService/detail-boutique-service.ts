import { Injectable } from '@angular/core';
import {Utils} from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class DetailBoutiqueService {
  private baseUrl = '/detailBoutique';

  constructor(private utils: Utils) {}
  public async getAll() {
    return this.utils.PGet(this.baseUrl);
  }

  public async addDetail(data: any) {
    return await this.utils.PPost(this.baseUrl, data);
  }
  public async getDetailBoutiqueByUserId(userId: string) {
    return await this.utils.PGet(`${this.baseUrl}/user/${userId}`);
  }

  public async updateDetail(userId: string, data: any) {
    return await this.utils.PPatch(`${this.baseUrl}/${userId}`, data);
  }
}
