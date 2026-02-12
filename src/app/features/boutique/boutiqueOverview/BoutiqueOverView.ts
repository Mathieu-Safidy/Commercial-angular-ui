import { Component } from '@angular/core';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../../../components/ui/card';
import { BadgeComponent } from '../../../components/ui/badge';
import { ButtonComponent } from '../../../components/ui/button';
import { SeparatorComponent } from '../../../components/ui/separator';
import { ProgressComponent } from '../../../components/ui/progress';
import { ArrowUpRight, TrendingUp, Eye, ShoppingCart, MessageSquare, LucideAngularModule } from 'lucide-angular';
import {NgClass, NgForOf} from '@angular/common';
import { IconsModule } from '../../../module/IconsModule';

@Component({
  selector: 'app-boutique-overview',
  standalone: true,
  imports: [
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ButtonComponent,
    SeparatorComponent,
    ProgressComponent,
    LucideAngularModule,
    NgForOf,
    NgClass,
    IconsModule
  ],
  templateUrl: './BoutiqueOverView.html'
})
export class BoutiqueOverviewComponent {

  readonly ArrowUpRight = ArrowUpRight;

  stats = [
    { label: 'Chiffre d\'affaires', value: '12,450€', trend: '+15.2%', icon: 'TrendingUp', color: 'text-emerald-500', trendColor: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Visites uniques', value: '8,240', trend: '+5.4%', icon: 'Eye', color: 'text-blue-500', trendColor: 'text-blue-500 bg-blue-500/10' },
    { label: 'Ventes totales', value: '142', trend: '+12.1%', icon: 'ShoppingCart', color: 'text-amber-500', trendColor: 'text-amber-500 bg-amber-500/10' },
    { label: 'Avis Clients', value: '4.9/5', trend: '+0.2', icon: 'MessageSquare', color: 'text-primary', trendColor: 'text-primary bg-primary/10' },
  ];

  bars = [60, 45, 80, 50, 90, 70, 100, 85, 95, 65, 75, 80];

  audience = [
    { label: 'France', val: 85 },
    { label: 'Belgique', val: 10 },
    { label: 'Suisse', val: 5 },
  ];
}
