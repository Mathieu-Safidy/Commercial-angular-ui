import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import {
  Building2,
  Search,
  MoreVertical,
  CheckCircle2,
  Plus,
  Box,
  FileText,
  Clock,
  Wrench
} from 'lucide-angular';
import {BadgeComponent} from '../../../components/ui/badge';
import { ButtonComponent } from '../../../components/ui/button';

@Component({
  selector: 'app-boutique-management',
  imports: [
    CommonModule,
    LucideAngularModule,
    BadgeComponent,
    ButtonComponent,
  ],
  templateUrl: './BoutiqueManagement.html'
})
export class BoutiqueManagementComponent {

  icons = {
    Building2,
    Search,
    MoreVertical,
    CheckCircle2,
    Plus,
    Box,
    FileText,
    Clock,
    Wrench
  };

  boxes = [
    {
      id: 'BOX-A1',
      size: '15m²',
      price: '450€',
      status: 'Occupé',
      tenant: 'Eco Luxe',
      maintenance: 'Effectuée'
    },
    {
      id: 'BOX-B4',
      size: '25m²',
      price: '850€',
      status: 'Libre',
      tenant: '-',
      maintenance: 'En attente'
    },
    {
      id: 'BOX-C2',
      size: '12m²',
      price: '320€',
      status: 'Occupé',
      tenant: 'Urban Tech',
      maintenance: 'Effectuée'
    }
  ];

  avatars = [1, 2];

  factures = [
    { label: 'Eco Luxe', sub: 'Location Janvier', price: '450€', status: 'Payé' },
    { label: 'Maintenance', sub: 'Nettoyage Zone A', price: '120€', status: 'Payé' },
    { label: 'Urban Tech', sub: 'Location Janvier', price: '320€', status: 'Retard' }
  ];
}
