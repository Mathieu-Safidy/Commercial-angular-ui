import { Component } from '@angular/core';
import { CardComponent, CardContentComponent } from '../../../components/ui/card';
import { NgClass, NgForOf } from '@angular/common';
import { BadgeComponent } from '../../../components/ui/badge';
import {
  Calendar,
  CircleCheck,
  Clock,
  Forward,
  LucideAngularModule,
  MessageSquareMore,
  Package,
  ShoppingBag,
  ThumbsUp,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { InputComponent } from '../../../components/ui/input';

type OrderStatus = 'Nouveau' | 'En préparation' | 'Prêt à envoyer' | 'Expédié';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: OrderStatus;
  time: string;
  text?: string;
  image?: string[];
}
@Component({
  selector: 'app-boutique-posts',
  standalone: true,
  templateUrl: './BoutiquePosts.html',
  imports: [
    CardComponent,
    CardContentComponent,
    NgClass,
    //BadgeComponent,
   // NgForOf,
   // InputComponent,
    ButtonComponent,
    LucideAngularModule,
  ],
})
export class BoutiquePostsComponent {
  readonly Calendar = Calendar;
  readonly Package = Package;
  readonly ShoppingBag = ShoppingBag;
  readonly CircleCheck = CircleCheck;
  readonly Clock = Clock;
  readonly ThumbsUp = ThumbsUp;
  readonly MessageSquareMore = MessageSquareMore;
  readonly Forward = Forward;
  orders: Order[] = [
    {
      id: 'Jean Peaul',
      customer: 'Sophie Martin',
      items: 3,
      total: '159€',
      status: 'Nouveau',
      time: '12 min ago',
      text: 'Découvrez notre nouvelle collection printemps-été avec des pièces légères et colorées pour un style frais et tendance !',
      image: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      ],
    },
    {
      id: '#ORD-9820',
      customer: 'Jean Dupont',
      items: 1,
      total: '45€',
      status: 'En préparation',
      time: '45 min ago',
    },
    {
      id: '#ORD-9818',
      customer: 'Emma Bernard',
      items: 2,
      total: '85€',
      status: 'Prêt à envoyer',
      time: '2 hours ago',
    },
    {
      id: '#ORD-9815',
      customer: 'Lucas Petit',
      items: 5,
      total: '340€',
      status: 'Expédié',
      time: '5 hours ago',
    },
  ];

  getStatusBarClass(status: OrderStatus): string {
    switch (status) {
      case 'Nouveau':
        return 'bg-primary';
      case 'En préparation':
        return 'bg-amber-500';
      case 'Expédié':
        return 'bg-emerald-500';
      default:
        return 'bg-blue-500';
    }
  }

  getStatusBadgeClass(status: OrderStatus): string {
    switch (status) {
      case 'Nouveau':
        return 'bg-primary text-white shadow-glow';
      case 'En préparation':
        return 'bg-amber-500/10 text-amber-500';
      case 'Expédié':
        return 'bg-emerald-500/10 text-emerald-500';
      default:
        return 'bg-blue-500/10 text-blue-500';
    }
  }
}
