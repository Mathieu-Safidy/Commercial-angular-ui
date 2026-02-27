import { Component } from '@angular/core';
import {
  Building2, Users, Calendar, Plus, Settings,
  Bell, Search, LayoutDashboard, ShieldCheck, Zap, LucideAngularModule,
  ChartColumn, LogOut
} from 'lucide-angular';
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {AdminOverviewComponent} from '../adminOverview/AdminOverview';
import {AdminPerformanceComponent} from '../adminPerformance/AdminPerformance';
import {BoutiqueManagementComponent} from '../boutiqueManagement/BoutiqueManagement';
import {AdminEventsComponent} from '../adminEvents/AdminEvents';

type Section = 'dashboard' | 'boutiques' | 'performance' | 'events' | 'ads' | 'settings';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './AdminDashBoard.html',
  imports: [
    NgClass,
    NgForOf,
    LucideAngularModule,
    AdminOverviewComponent,
    AdminPerformanceComponent,
    BoutiqueManagementComponent,
    AdminEventsComponent,
    NgIf
  ]
})
export class AdminDashboardComponent {
  activeSection: Section = 'dashboard';

  readonly icons = { Building2, Users, Calendar, ChartColumn, Plus, Settings, Bell, Search, LayoutDashboard, ShieldCheck, Zap, LogOut };
  // readonly BarChart3 = BarChart3;
  sidebarItems: { id: Section; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard Global', icon: LayoutDashboard },
    { id: 'boutiques', label: 'Gestion Boutiques', icon: Building2 },
    { id: 'performance', label: 'Performance & Trafic', icon: ChartColumn },
    { id: 'events', label: 'Événements & Jeux', icon: Calendar },
    { id: 'ads', label: 'Publicités & Partenaires', icon: Zap },
    { id: 'settings', label: 'Administration', icon: ShieldCheck },
  ];


  get activeSectionLabel() {
    const item = this.sidebarItems.find(i => i.id === this.activeSection);
    return item ? item.label : '';
  }
}
