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
}
