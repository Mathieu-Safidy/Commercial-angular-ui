// count-by-category.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../features/client/catalogue/products-catalogue';

@Pipe({
  name: 'countByCategory',
  standalone: true,
  pure: true
})
export class CountByCategoryPipe implements PipeTransform {
  transform(products: Produit[], category: string): number {
    return products.filter(p => p.idCategorie === category).length;
  }
}