import { Component } from '@angular/core';
import {BoutiqueOrdersComponent} from '../boutiqueOrders/BoutiqueOrders';
import {BoutiqueStatsComponent} from '../boutiqueStats/BoutiqueStats';
import {BoutiqueProductsComponent} from '../boutiqueProducts/BoutiqueProducts';
import {BoutiqueOverviewComponent} from '../boutiqueOverview/BoutiqueOverView';
import {CommonModule, NgClass, NgForOf, NgIf} from '@angular/common';
import {ChartColumn, Image, LayoutDashboard, LucideAngularModule, LucideIconData, MessageSquare, Package, Plus, Section, Settings, ShoppingCart, Tag, User} from 'lucide-angular';
import {ButtonComponent} from '../../../components/ui/button';
import {BadgeComponent} from '../../../components/ui/badge';
import {SeparatorComponent} from '../../../components/ui/separator';
import {ProgressComponent} from '../../../components/ui/progress';
import {EmptyComponent} from '../../../components/ui/empty';
import { IconsModule } from '../../../module/IconsModule';
import { BoutiquePostsComponent } from "../boutiquePosts/BoutiquePosts";
import { ClientReviewsComponent } from '../../client/clientReviews/ClientReviews';
import { BoutiqueProfilComponent } from '../boutiqueProfil/BoutiqueProfil';

type Section = 'overview' | 'products' | 'orders' | 'stats' | 'promos' | 'posts' | 'settings' | 'avis';

@Component({
  selector: 'app-boutique-dashboard',
  templateUrl: './BoutiqueDashBoard.html',
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
    EmptyComponent,
    LucideAngularModule,
    IconsModule,
    BoutiquePostsComponent,
    ClientReviewsComponent,
    BoutiqueProfilComponent
],
  // styleUrls: ['./boutique-dashboard.component.scss']
})
export class BoutiqueDashboardComponent {

  readonly Plus = Plus;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Package = Package;
  readonly Tag = Tag;
  readonly Image = Image;
  readonly ChartColumn = ChartColumn;
  readonly Settings = Settings;
  readonly ShoppingCart = ShoppingCart;

  activeSection: Section = 'overview';

  sidebarItems: { id: Section; label: string; badge?: string; icon?: LucideIconData }[] = [
    { id: 'overview', label: "Vue d'ensemble" , icon: LayoutDashboard },
    { id: 'products', label: 'Catalogue', badge: 'New' , icon: Package },
    { id: 'orders', label: 'Commandes' , icon: ShoppingCart },
    { id: 'promos', label: 'Promotions' , icon: Tag },
    { id: 'posts', label: 'Actualités' , icon: Image },
    { id: 'stats', label: 'Statistiques' , icon: ChartColumn },
    { id: 'settings', label: 'Configuration' , icon: Settings },
    { id: 'avis', label: 'Profil', icon: User }
  ];

  setSection(section: Section) {
    this.activeSection = section;
  }

  protected readonly Section = Section;
}
