import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {ButtonComponent} from '../../../components/ui/button';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './AdminOverview.html',
  imports: [
    NgForOf,
    LucideAngularModule,
    ButtonComponent
  ]
})
export class AdminOverviewComponent {
  // KPI
  kpis = [
    { label: 'Trafic Global', value: '1.2M', trend: '+24%', sub: 'visiteurs/mois' },
    { label: 'Boutiques Actives', value: '48', trend: '+2', sub: 'nouvelles ce mois' },
    { label: 'CA Global', value: '854k €', trend: '+12%', sub: 'CA Annuel cumulé' },
    { label: 'Événements', value: '12', trend: '+4', sub: 'prévus cette semaine' },
  ];


  months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Top boutiques
  topBoutiques = [
    { name: 'Eco Luxe', ca: '124k €', trend: '+15%' },
    { name: 'Urban Tech', ca: '98k €', trend: '+8%' },
    { name: 'Retro Style', ca: '76k €', trend: '+12%' },
  ];
}
