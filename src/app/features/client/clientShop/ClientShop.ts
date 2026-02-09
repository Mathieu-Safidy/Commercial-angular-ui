import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  ShoppingBag,
  ArrowRight,
  Star,
  Heart,
  TrendingUp,
  Sparkles
} from 'lucide-angular';

// Imports de tes composants UI (assure-toi que les chemins sont corrects)
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { CardComponent, CardContentComponent } from '../../../components/ui/card';

@Component({
  selector: 'app-client-shop',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardContentComponent
  ],
  templateUrl: './ClientShop.html'
})
export class ClientShopComponent {
  // Mapping des icônes
  readonly ShoppingBag = ShoppingBag;
  readonly ArrowRight = ArrowRight;
  readonly Star = Star;
  readonly Heart = Heart;
  readonly TrendingUp = TrendingUp;
  readonly Sparkles = Sparkles;

  featuredBoutiques = [
    { name: "Eco Luxe", category: "Mode", rating: 4.8, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" },
    { name: "Artisans du Bois", category: "Déco", rating: 4.9, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800" },
    { name: "Urban Tech", category: "Électronique", rating: 4.7, image: "https://images.unsplash.com/photo-1491933382434-50028619b54b?auto=format&fit=crop&q=80&w=800" },
  ];

  products = [
    { id: 1, name: "Montre Minimaliste", boutique: "Eco Luxe", price: "129€", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Vase Céramique", boutique: "Artisans du Bois", price: "45€", image: "https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Casque ANC", boutique: "Urban Tech", price: "299€", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Sac à dos Urbain", boutique: "Eco Luxe", price: "85€", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800" },
  ];

  // Helper pour simuler les avatars des abonnés
  subscriberIds = [1, 2, 3];
}
