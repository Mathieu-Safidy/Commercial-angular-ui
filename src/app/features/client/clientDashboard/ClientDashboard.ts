import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  ShoppingCart,
  Clock,
  LayoutGrid,
  MessageSquare,
  MapPin
} from 'lucide-angular';


import { ClientShopComponent } from '../clientShop/ClientShop';
import { ClientHistoryComponent } from '../clientHistory/ClientHistory';
import { ClientRentalsComponent } from '../clientRentals/ClientRentals';
import { ClientReviewsComponent } from '../clientReviews/ClientReviews';


import { TabsComponent, TabsListComponent, TabsTriggerComponent, TabsContentComponent } from '../../../components/ui/tabs';
import { BoutiquePostsComponent } from '../../boutique/boutiquePosts/BoutiquePosts';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ClientShopComponent,
    ClientHistoryComponent,
    ClientRentalsComponent,
    ClientReviewsComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    BoutiquePostsComponent
  ],
  templateUrl: './ClientDashboard.html'
})
export class ClientDashboardComponent {
  readonly ShoppingCart = ShoppingCart;
  readonly Clock = Clock;
  readonly LayoutGrid = LayoutGrid;
  readonly MessageSquare = MessageSquare;
  readonly MapPin = MapPin;

  avatars = [1, 2, 3, 4];
}
