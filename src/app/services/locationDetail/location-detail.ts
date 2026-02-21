import {inject, Injectable} from '@angular/core';
import {Utils} from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class LocationDetail {
  private baseUrl = '/detailLocations';
  private http = inject(Utils);
  constructor(private utils: Utils) {}

  public async getAll() {
    return this.utils.PGet(this.baseUrl);
  }
}

