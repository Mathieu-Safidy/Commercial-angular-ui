import { Component } from '@angular/core';
import {CardComponent, CardContentComponent} from '../../../components/ui/card';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {BadgeComponent} from '../../../components/ui/badge';
import {InputComponent} from '../../../components/ui/input';
import {ButtonComponent} from '../../../components/ui/button';
import {
  Calendar,
  CircleCheck,
  Clock,
  LucideAngularModule,
  Package,
  ShoppingBag,
  ShoppingCart,
  Trash2
} from 'lucide-angular';
import {CommandeService} from "../../../services/commande/commande";
import {CommandeDetailService} from '../../../services/commandeDetail/commande-detail';
import {SeparatorComponent} from '../../../components/ui/separator';

type OrderStatus = 'en_cours' | 'terminee' | 'annulee' ;

interface OrderDetail {
  idProduit: {
    nom: string;
    prixInitial: number;
    boutique?: string;
    image?: string;
  };
  quantite: number;
}

interface Order {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: OrderStatus;
  time: string;
  details?: OrderDetail[];
}


@Component({
  selector: 'app-boutique-orders',
  standalone: true,
  templateUrl: './BoutiqueOrders.html',
  imports: [
    CardComponent,
    CardContentComponent,
    NgClass,
    BadgeComponent,
    NgForOf,
    InputComponent,
    ButtonComponent,
    LucideAngularModule,
    NgIf,
    SeparatorComponent,
  ]
})
export class BoutiqueOrdersComponent {

  readonly Calendar = Calendar;
  readonly Package = Package;
  readonly ShoppingBag = ShoppingBag;
  readonly CircleCheck = CircleCheck;
  readonly Clock = Clock;

  orders: Order[] = [];
  expandedOrderId?: string;

  constructor(private commandeService: CommandeService , private commandeDetailService: CommandeDetailService) {}

  async ngOnInit() {
    const data = await this.commandeService.getAll() as any[];
    this.orders = data.map(cmd => ({
      id: cmd._id || cmd.id,
      customer: cmd.customer || 'Client inconnu',
      items: cmd.items || 0,
      total: cmd.total ? cmd.total.toLocaleString('fr-FR') + ' Ar' : '0 Ar',
      status: cmd.status || 'en_cours',
      time: cmd.time,
      details: [] as OrderDetail[]
    }));
  }

  async showDetails(order: Order) {

    if (this.expandedOrderId === order.id) {
      this.expandedOrderId = undefined;
      return;
    }

    this.expandedOrderId = order.id;


    const details = await this.commandeDetailService.getByCommandeId(order.id) as OrderDetail[];

    // Mettre à jour les détails pour l'order
    order.details = details || [];
  }

  isExpanded(order: Order): boolean {
    return this.expandedOrderId === order.id;
  }

  getStatusBarClass(status: OrderStatus) {
    switch(status) {
      case 'en_cours': return 'bg-yellow-500';
      case 'terminee': return 'bg-green-500';
      case 'annulee': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  getStatusBadgeClass(status: OrderStatus) {
    switch(status) {
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'terminee': return 'bg-green-100 text-green-800';
      case 'annulee': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  protected readonly trash = Trash2;
}
