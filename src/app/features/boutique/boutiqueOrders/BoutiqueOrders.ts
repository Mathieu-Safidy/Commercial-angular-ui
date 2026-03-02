import { Component, inject, Signal, signal } from '@angular/core';
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
import { AuthServices } from '../../../services/authService/auth.services';
import { DetailBoutiqueService } from '../../../services/detailBoutiqueService/detail-boutique-service';
import { DetailBoutique } from '../../../model/detailBoutiqueModel';

type OrderStatus = 'en_cours' | 'valide' | 'annulee' ;

interface OrderDetail {
  idProduit: {
    nom: string;
    prixInitial: number;
    boutique?: string;
    image?: string;
  };
  quantite: number;
  reduction?: number;
  prixPromotionnel ?: number;
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
  authService = inject(AuthServices);
  detailBoutiqueService = inject(DetailBoutiqueService) ;
  user: User | any = this.authService.currentUserSubject.value || { } ;
  userId = this.user._id;
  idBoutique = "" ; 
  // orders: Order[] = [];
  orders = signal<Order[]>([] as Order[]);
  expandedOrderId = signal("");

  constructor(private commandeService: CommandeService , private commandeDetailService: CommandeDetailService) {}

  async ngOnInit() {
    // const data = await this.commandeService.getAll() as any[];
    await this.loadDetailBoutique() ; 
    console.log("ID BOUTIQUE 111 ::: " , this.idBoutique) ; 
    const data =  await this.commandeService.getCommandeByIdBoutique( this.idBoutique) as any[]; 
    this.orders.set(data.map(cmd => ({
      id: cmd._id || cmd.id,
      customer: cmd.customer || 'Client inconnu',
      items: cmd.items || 0,
      total: cmd.total ? cmd.total.toLocaleString('fr-FR') + ' Ar' : '0 Ar',
      status: cmd.status || 'en_cours',
      time: cmd.time ,
      details: [] as OrderDetail[]
    })));
    console.log(" orders :::::: " , this.orders()) ; 
  }
  
  async loadDetailBoutique() {
      try {
        const res = await this.detailBoutiqueService.getDetailBoutiqueByUserId(this.userId) as DetailBoutique;
        this.idBoutique = res.idBoutique._id ; 
      }catch (err) {
        console.error('Erreur lors du chargement :', err);
      }
  }

  async showDetails(order: Order) {
    if (this.expandedOrderId() === order.id) {
      this.expandedOrderId.set("");
      return;
    }
    this.expandedOrderId.set(order.id);

    const details = await this.commandeDetailService.getByCommandeId(order.id) as OrderDetail[];
    this.orders.set(this.orders().map(o => o.id === order.id ? {...o, details} : o));
  }

  async valideOrder(order: Order) {
    await this.commandeService.valideClientCommandeStatus(order.id);
  }

  isExpanded(order: Order): boolean {
    return this.expandedOrderId() === order.id;
  }

  getStatusBarClass(status: OrderStatus) {
    switch(status) {
      case 'en_cours': return 'bg-yellow-500';
      case 'valide': return 'bg-green-500';
      case 'annulee': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  getStatusBadgeClass(status: OrderStatus) {
    switch(status) {
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'valide': return 'bg-green-100 text-green-800';
      case 'annulee': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  protected readonly trash = Trash2;
}
