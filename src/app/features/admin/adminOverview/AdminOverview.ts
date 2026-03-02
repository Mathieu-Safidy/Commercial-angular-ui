import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { BarChart3, LucideAngularModule, Zap } from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../../../components/ui/card';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './AdminOverview.html',
  imports: [
    NgForOf,
    LucideAngularModule,
    ButtonComponent,
    CardComponent,
  ],
})
export class AdminOverviewComponent {
  // readonly BarChart3 = BarChart3;

  readonly icons = { BarChart3, Zap };

  // KPI
  kpis = [
    { label: 'Trafic Global', value: '1.2M', trend: '+24%', sub: 'visiteurs/mois' },
    { label: 'Boutiques Actives', value: '48', trend: '+2', sub: 'nouvelles ce mois' },
    { label: 'CA Global', value: '854k MGA', trend: '+12%', sub: 'CA Annuel cumulé' },
    { label: 'Événements', value: '12', trend: '+4', sub: 'prévus cette semaine' },
  ];

  months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Top boutiques
  topBoutiques = [
    { name: 'Eco Luxe', ca: '124k MGA', trend: '+15%' },
    { name: 'Urban Tech', ca: '98k MGA', trend: '+8%' },
    { name: 'Retro Style', ca: '76k MGA', trend: '+12%' },
  ];
}
