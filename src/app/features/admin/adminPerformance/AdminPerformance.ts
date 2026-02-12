import { Component } from '@angular/core';
import { CommonModule, NgForOf, NgIf, NgClass } from '@angular/common';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardContentComponent
} from '../../../components/ui/card';
import { BadgeComponent } from '../../../components/ui/badge';
import { LucideAngularModule } from 'lucide-angular';

interface PeakDay {
  day: string;
  value: number;
  color: string;
}

interface PopularProduct {
  category: string;
  name: string;
  growth: string;
  top: boolean;
}

@Component({
  selector: 'app-admin-performance',
  templateUrl: './AdminPerformance.html',
  imports: [
    CommonModule,
    NgForOf,
    NgIf,
    NgClass,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    BadgeComponent,
    LucideAngularModule
  ]
})
export class AdminPerformanceComponent {
  peakDays: { day: string; value: string; color: string }[] = [
    { day: 'Samedi', value: '95', color: 'bg-primary' },
    { day: 'Vendredi', value: '82', color: 'bg-primary/80' },
    { day: 'Mercredi', value: '65', color: 'bg-primary/60' },
    { day: 'Dimanche', value: '58', color: 'bg-primary/40' },
    { day: 'Lundi', value: '42', color: 'bg-primary/20' },
  ];

  popularProducts: { category: string; name: string; growth: string; top: string }[] = [
    { category: 'High-Tech', name: 'Casque Bluetooth Pro', growth: '+45%', top: 'true' },
    { category: 'Mode', name: 'Sneakers Limited', growth: '+32%', top: 'true' },
    { category: 'Déco', name: 'Lampe Minimaliste', growth: '+12%', top: 'false' },
    { category: 'Sport', name: 'Set de Fitness', growth: '+8%', top: 'false' },
    { category: 'Bijoux', name: 'Bague Argent', growth: '-4%', top: 'false' },
  ];
}
