import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import des icônes (si tu utilises lucide-angular) ou utilise des SVG/Emoji pour tester
import {
  LucideAngularModule,
  ShoppingBag,
  Trash2,
  CreditCard,
  CheckCircle2,
  Truck,
  ChevronRight,
  Clock,
  ShoppingCart
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { CardComponent, CardContentComponent } from '../../../components/ui/card';
import { SeparatorComponent } from '../../../components/ui/separator';

@Component({
  selector: 'app-client-history',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardContentComponent,
    SeparatorComponent
  ],
  templateUrl: './ClientHistory.html'
})
export class ClientHistoryComponent {
  readonly shoppingBag = ShoppingBag;
  readonly trash = Trash2;
  readonly creditCard = CreditCard;
  readonly checkCircle = CheckCircle2;
  readonly truck = Truck;
  readonly chevronRight = ChevronRight;
  readonly clock = Clock;
  readonly ShoppingCart = ShoppingCart;

  cartItems = [
    { id: 1, name: "Montre Minimaliste", boutique: "Eco Luxe", price: 129, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200" },
    { id: 2, name: "Vase Céramique", boutique: "Artisans du Bois", price: 45, image: "https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&q=80&w=200" },
  ];

  orders = [
    { id: "#ORD-9821", date: "12 Jan 2026", status: "Livré", total: "245€", items: 3 },
    { id: "#ORD-9805", date: "05 Jan 2026", status: "En cours", total: "85€", items: 1 },
    { id: "#ORD-9750", date: "22 Dec 2025", status: "Livré", total: "520€", items: 5 },
  ];
}
