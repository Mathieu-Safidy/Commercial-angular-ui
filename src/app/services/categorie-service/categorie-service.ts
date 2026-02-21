import { inject, Injectable } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
    http = inject(Utils);
    public async getCategories() : Promise<Categorie[]> {
      return await this.http.PGet('/categories') as any as Categorie[];
    }
}
