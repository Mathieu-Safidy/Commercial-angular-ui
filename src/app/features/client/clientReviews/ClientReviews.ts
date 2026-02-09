import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Star,
  MessageSquare,
  ThumbsUp,
  Award,
  MoreVertical,
  Camera
} from 'lucide-angular';

// Imports de tes composants UI
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { CardComponent, CardContentComponent } from '../../../components/ui/card';
import { ProgressComponent } from '../../../components/ui/progress';

@Component({
  selector: 'app-client-reviews',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardContentComponent,
    ProgressComponent
  ],
  templateUrl: './ClientReviews.html'
})
export class ClientReviewsComponent {
  // Mapping Lucide
  readonly Star = Star;
  readonly MessageSquare = MessageSquare;
  readonly ThumbsUp = ThumbsUp;
  readonly Award = Award;
  readonly MoreVertical = MoreVertical;
  readonly Camera = Camera;

  // Données
  reviews = [
    {
      id: 1,
      user: "Sophie Martin",
      boutique: "Eco Luxe",
      product: "Montre Minimaliste",
      rating: 5,
      comment: "Magnifique montre, reçue très rapidement. La boutique est très réactive par message.",
      date: "il y a 2 jours",
      likes: 12
    },
    {
      id: 2,
      user: "Marc Lambert",
      boutique: "Artisans du Bois",
      product: "Vase Céramique",
      rating: 4,
      comment: "Très bel objet, mais l'emballage était un peu léger. Heureusement rien n'est cassé.",
      date: "il y a 1 semaine",
      likes: 4
    },
  ];

  // Helper pour les stats (5 étoiles = 80%, etc.)
  getStarPercentage(star: number): number {
    const stats: Record<number, number> = { 5: 80, 4: 15, 3: 5, 2: 0, 1: 0 };
    return stats[star] || 0;
  }
}
