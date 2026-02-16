import { Injectable } from '@angular/core';
import {Utils} from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private baseUrl = '/commandes';

  constructor(private utils: Utils) {}

  async getAll() {
    return this.utils.PGet(this.baseUrl);
  }
}

