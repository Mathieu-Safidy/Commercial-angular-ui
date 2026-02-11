import { Component } from '@angular/core';
import {CardComponent, CardContentComponent} from '../../../components/ui/card';
import {NgClass, NgForOf} from '@angular/common';
import {BadgeComponent} from '../../../components/ui/badge';
import {InputComponent} from '../../../components/ui/input';
import {ButtonComponent} from '../../../components/ui/button';

type OrderStatus = 'Nouveau' | 'En préparation' | 'Prêt à envoyer' | 'Expédié';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: OrderStatus;
  time: string;
}

@Component({
  selector: 'app-boutique-orders',
  standalone: true,
  templateUrl: './BoutiqueOrders.html',
  imports: [
    CardComponent,
    CardContentComponent,
    NgClass,
    BadgeComponent,
    NgForOf,
    InputComponent,
    ButtonComponent
  ]
})
export class BoutiqueOrdersComponent {

  orders: Order[] = [
    { id: '#ORD-9821', customer: 'Sophie Martin', items: 3, total: '159€', status: 'Nouveau', time: '12 min ago' },
    { id: '#ORD-9820', customer: 'Jean Dupont', items: 1, total: '45€', status: 'En préparation', time: '45 min ago' },
    { id: '#ORD-9818', customer: 'Emma Bernard', items: 2, total: '85€', status: 'Prêt à envoyer', time: '2 hours ago' },
    { id: '#ORD-9815', customer: 'Lucas Petit', items: 5, total: '340€', status: 'Expédié', time: '5 hours ago' },
  ];

  getStatusBarClass(status: OrderStatus): string {
    switch (status) {
      case 'Nouveau': return 'bg-primary';
      case 'En préparation': return 'bg-amber-500';
      case 'Expédié': return 'bg-emerald-500';
      default: return 'bg-blue-500';
    }
  }

  getStatusBadgeClass(status: OrderStatus): string {
    switch (status) {
      case 'Nouveau': return 'bg-primary text-white shadow-glow';
      case 'En préparation': return 'bg-amber-500/10 text-amber-500';
      case 'Expédié': return 'bg-emerald-500/10 text-emerald-500';
      default: return 'bg-blue-500/10 text-blue-500';
    }
  }
}
