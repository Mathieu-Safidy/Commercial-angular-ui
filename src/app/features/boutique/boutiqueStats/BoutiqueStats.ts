import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../../../components/ui/card';
import { BadgeComponent } from '../../../components/ui/badge';
import { ButtonComponent } from '../../../components/ui/button';
import { BarChart3, ChevronRight, Clock, Eye, Heart, LucideAngularModule, MessageSquare, Target, TrendingUp, Zap } from 'lucide-angular';

@Component({
  selector: 'app-boutique-stats',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ButtonComponent,
    LucideAngularModule
  ],
  templateUrl: './BoutiqueStats.html',
})
export class BoutiqueStatsComponent {
  readonly Zap = Zap;
  readonly BarChart3 = BarChart3; // Remplace par l'icône BarChart3 si elle existe dans LucideAngularModule
  readonly Target = Target;
  readonly Clock = Clock;
  readonly Heart = Heart;
  readonly ChevronRight = ChevronRight;
  readonly MessageSquare = MessageSquare;
  readonly Eye = Eye;
  readonly TrendingUp = TrendingUp;
  topProducts = [
    { name: "Montre Minimaliste", views: "1,2k", conversion: "12%", trend: "+5%" },
    { name: "Casque ANC", views: "850", conversion: "8%", trend: "-2%" },
    { name: "Sac à dos Urbain", views: "620", conversion: "15%", trend: "+8%" },
  ];

  popularPosts = [
    { title: "Nouveautés Hiver 2026", likes: 124, comments: 45, date: "12 Jan" },
    { title: "Promo Express -20%", likes: 89, comments: 12, date: "05 Jan" },
  ];

  // Convert percentage string "12%" → number 12
  getConversionValue(conversion: string): number {
    return Number(conversion.replace('%',''));
  }

  isPositiveTrend(trend: string): boolean {
    return trend.startsWith('+');
  }

}
