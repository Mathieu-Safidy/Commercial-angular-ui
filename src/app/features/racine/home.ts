import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule, User, Store, ShieldCheck,
  Search, Bell, Menu, Moon, Sun
} from 'lucide-angular';
import { ButtonComponent } from '../../components/ui/button';
import { BadgeComponent } from '../../components/ui/badge';
import { SeparatorComponent } from '../../components/ui/separator';
import { ClientDashboardComponent } from '../client/clientDashboard/ClientDashboard';
import { BoutiqueDashboardComponent } from '../boutique/boutiqueDashboard/BoutiqueDashBoard';
import { AdminDashboardComponent } from '../admin/adminDashboard/AdminDashBoard';

// --- N'oublie pas d'importer tes composants ici ---
// import { ClientDashboardComponent } from './features/client/clientDashboard/ClientDashboard';
// import { BoutiqueDashboardComponent } from './features/boutique/BoutiqueDashboard';
// import { AdminDashboardComponent } from './features/admin/AdminDashboard';

// Import UI
// import { ButtonComponent } from './components/ui/button';
// import { InputComponent } from './components/ui/input';
// import { BadgeComponent } from './components/ui/badge';
// import { SeparatorComponent } from './components/ui/separator';
// import {BoutiqueDashboardComponent} from './features/boutique/boutiqueDashboard/BoutiqueDashBoard';
// import {AdminDashboardComponent} from './features/admin/adminDashboard/AdminDashBoard';

// Définition du type (en dehors ou dans la classe)
type Profile = 'client' | 'boutique' | 'admin';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    SeparatorComponent,
    ClientDashboardComponent,
    BoutiqueDashboardComponent,
    AdminDashboardComponent,
    // BoutiqueDashboardComponent,
    // AdminDashboardComponent
  ],
  templateUrl: './home.html'
})
export class Home {
  activeProfile: Profile = 'client';
  isDarkMode: boolean = false;

  // Icônes pour le template
  readonly User = User;
  readonly Store = Store;
  readonly ShieldCheck = ShieldCheck;
  readonly Search = Search;
  readonly Bell = Bell;
  readonly Menu = Menu;
  readonly Moon = Moon;
  readonly Sun = Sun;

  // ✅ MÉTHODE POUR CHANGER LE PROFIL
  setActiveProfile(profile: Profile) {
    this.activeProfile = profile;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark');
  }
}
