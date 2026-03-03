import {inject, Injectable} from '@angular/core';
import {Utils} from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class Box {
  private baseUrl = '/boxes';
  private http = inject(Utils);
  constructor(private utils: Utils) {}

  public async getAll() {
    return this.utils.PGet(this.baseUrl);
  }

  public async create(box: { dimension: number; prixInitial: number, position: number, numero: string }) {
    return this.utils.PPost(this.baseUrl, box);
  }

  public async update(id: string, box: { dimension: number; prixInitial: number, position: number, numero: string }) {
    return this.utils.PPatch(`${this.baseUrl}/${id}`, box);
  }

  public async delete(id: string) {
    return this.utils.PDelete(`${this.baseUrl}/${id}`);
  }
}
