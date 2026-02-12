import { Component } from '@angular/core';
import {ArrowRight, Calendar, LucideAngularModule, MoreVertical, Plus, QrCode, Share2, Star, Ticket, Trophy, Users, Zap} from 'lucide-angular';
import {CardComponent, CardContentComponent} from '../../../components/ui/card';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {BadgeComponent} from '../../../components/ui/badge';

interface AdminEvent {
  id: number;
  title: string;
  date: string;
  participants: string;
  status: 'Actif' | 'Planifié';
  type: 'Jeu & Concours' | 'Lancement' | 'Atelier';
}

interface Partnership {
  brand: string;
  period: string;
  reach: string;
  active: boolean;
}

@Component({
  selector: 'app-admin-events',
  templateUrl: './AdminEvents.html',
  imports: [
    LucideAngularModule,
    CardComponent,
    CardContentComponent,
    NgClass,
    BadgeComponent,
    NgIf,
    NgForOf
  ]
})
export class AdminEventsComponent {

  icons = { Plus, Trophy, Zap, Ticket, Calendar, Users, QrCode, MoreVertical, ArrowRight, Share2, Star, }
  events: AdminEvent[] = [
    {
      id: 1,
      title: 'Grand Jeu Concours Été',
      date: '15 Juin - 30 Juin',
      participants: '1,450',
      status: 'Planifié',
      type: 'Jeu & Concours',
    },
    {
      id: 2,
      title: "Lancement Marque 'Aurora'",
      date: '22 Mai',
      participants: '450',
      status: 'Actif',
      type: 'Lancement',
    },
    {
      id: 3,
      title: 'Atelier Artisans Locaux',
      date: '10 Mai',
      participants: '120',
      status: 'Planifié',
      type: 'Atelier',
    },
  ];

  partnerships: Partnership[] = [
    {
      brand: 'Institution A',
      period: '1 mois',
      reach: '120k',
      active: true,
    },
    {
      brand: 'Banque Locale',
      period: '3 mois',
      reach: '450k',
      active: true,
    },
    {
      brand: 'Travel Agency',
      period: '2 sem.',
      reach: '45k',
      active: false,
    },
  ];

}
