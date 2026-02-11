import { Component } from '@angular/core';
import {BoutiqueOrdersComponent} from '../boutiqueOrders/BoutiqueOrders';
import {BoutiqueStatsComponent} from '../boutiqueStats/BoutiqueStats';
import {BoutiqueProductsComponent} from '../boutiqueProducts/BoutiqueProducts';
import {BoutiqueOverviewComponent} from '../boutiqueOverview/BoutiqueOverView';
import {CommonModule, NgClass, NgForOf, NgIf} from '@angular/common';
import {Section} from 'lucide-angular';
import {ButtonComponent} from '../../../components/ui/button';
import {BadgeComponent} from '../../../components/ui/badge';
import {SeparatorComponent} from '../../../components/ui/separator';
import {ProgressComponent} from '../../../components/ui/progress';
import {EmptyComponent} from '../../../components/ui/empty';

type Section = 'overview' | 'products' | 'orders' | 'stats' | 'promos' | 'posts' | 'settings';

@Component({
  selector: 'app-boutique-dashboard',
  templateUrl: './BoutiqueDashboard.html',
  imports: [
    BoutiqueOrdersComponent,
    BoutiqueStatsComponent,
    BoutiqueProductsComponent,
    BoutiqueOverviewComponent,
    NgClass,
    NgIf,
    NgForOf,
    CommonModule,
    ButtonComponent,
    BadgeComponent,
    SeparatorComponent,
    ProgressComponent,
    EmptyComponent
  ],
  // styleUrls: ['./boutique-dashboard.component.scss']
})
export class BoutiqueDashboardComponent {

  activeSection: Section = 'overview';

  sidebarItems: { id: Section; label: string; badge?: string }[] = [
    { id: 'overview', label: "Vue d'ensemble" },
    { id: 'products', label: 'Catalogue', badge: 'New' },
    { id: 'orders', label: 'Commandes' },
    { id: 'promos', label: 'Promotions' },
    { id: 'posts', label: 'Actualités' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'settings', label: 'Configuration' },
  ];

  setSection(section: Section) {
    this.activeSection = section;
  }

  protected readonly Section = Section;
}
