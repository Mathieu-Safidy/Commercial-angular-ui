import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LucideAngularModule,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  AlertCircle
} from 'lucide-angular';
import {CardComponent} from '../../../components/ui/card';
import {ButtonComponent} from '../../../components/ui/button';
import {BadgeComponent} from '../../../components/ui/badge';
import {InputComponent} from '../../../components/ui/input';

@Component({
  selector: 'app-boutique-products',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    InputComponent,
    LucideAngularModule,
    CardComponent
  ],
  templateUrl: './BoutiqueProducts.html'
})
export class BoutiqueProductsComponent {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Filter = Filter;
  readonly MoreVertical = MoreVertical;
  readonly Eye = Eye;
  readonly Edit3 = Edit3;
  readonly Trash2 = Trash2;
  readonly AlertCircle = AlertCircle;

  products = [
    {
      id: 1,
      name: 'Montre Minimaliste',
      stock: 12,
      price: '129€',
      status: 'En stock',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      name: 'Vase Céramique',
      stock: 5,
      price: '45€',
      status: 'Stock faible',
      image: 'https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 3,
      name: 'Casque ANC',
      stock: 0,
      price: '299€',
      status: 'Rupture',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 4,
      name: 'Sac à dos Urbain',
      stock: 24,
      price: '85€',
      status: 'En stock',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400'
    }
  ];
}
