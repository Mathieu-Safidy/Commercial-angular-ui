import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import des icônes (si tu utilises lucide-angular) ou utilise des SVG/Emoji pour tester
import {
  LucideAngularModule,
  ShoppingBag,
  Trash2,
  CreditCard,
  CheckCircle2,
  Truck,
  ChevronRight,
  Clock,
  ShoppingCart,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { CardComponent, CardContentComponent } from '../../../components/ui/card';
import { SeparatorComponent } from '../../../components/ui/separator';
import { PanierService } from '../../../services/panierService/panier-service';
import {CommandeService} from '../../../services/commande/commande';
import {AuthServices} from '../../../services/authService/auth.services';
import { ConfirmModalService } from '../../../components/comfirmation/confirm-modal.service';

@Component({
  selector: 'app-client-history',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardContentComponent,
    SeparatorComponent,
  ],
  templateUrl: './ClientHistory.html',
})
export class ClientHistoryComponent {
  readonly shoppingBag = ShoppingBag;
  readonly trash = Trash2;
  readonly creditCard = CreditCard;
  readonly checkCircle = CheckCircle2;
  readonly truck = Truck;
  readonly chevronRight = ChevronRight;
  readonly clock = Clock;
  readonly ShoppingCart = ShoppingCart;
  panierService = inject(PanierService);
  commandeService = inject(CommandeService);
  private confirmModal = inject(ConfirmModalService);

  authService = inject(AuthServices);
  user: User | any = this.authService.currentUserSubject.value || { } ;
  userId = this.user._id;

  priceFinal = signal<number>(0);
  orders = signal<any>([
    // { id: '#ORD-9821', date: '12 Jan 2026', status: 'Livré', total: '245Ar', items: 3 },
    // { id: '#ORD-9805', date: '05 Jan 2026', status: 'En cours', total: '85Ar', items: 1 },
    // { id: '#ORD-9750', date: '22 Dec 2025', status: 'Livré', total: '520Ar', items: 5 },
  ]);
  cartItems = signal<any>([
    // {
    //   _id: 1,
    //   nom: 'Montre Minimaliste',
    //   boutique: 'Eco Luxe',
    //   quantite: 1,
    //   price: 129,
    //   image:
    //     'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200',
    // },
    // {
    //   _id: 2,
    //   nom: 'Vase Céramique',
    //   boutique: 'Artisans du Bois',
    //   quantite: 2,
    //   price: 45,
    //   image:
    //     'https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&q=80&w=200',
    // },
  ]);

  constructor() {
    effect(() => {
      const panierTermine = this.panierService.panierTermine();
      if (!panierTermine) return;
      this.orders.set(
        panierTermine.map((item: any) => ({
          id: item._id,
          date: item.createdAt,
          status: 'Livré',
          total: item.total,
          items: item.quantiteTotal
        }))
      )

      const panier = this.panierService.panier();
      if (!panier) return;

      this.cartItems.set(
        panier.details.map((detail: PanierDetail) => ({
          _id: detail._id,
          nom: detail.produit.nom,
          boutique: detail.produit.boutique.nom,
          price: detail.produit.prixInitial,
          quantite: detail.quantite,
          image: detail.produit.image ? this.panierService.backendLink + '/' + detail.produit.image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200', // Placeholder, à remplacer par detail.produit.image si disponible,
        })),
      );
      let total = panier.details.reduce( (total: number, detail: PanierDetail) => total + detail.produit.prixInitial * detail.quantite, 0, )
      this.priceFinal.set( Number(total.toFixed(2)) );
      
    
    });
  }

  ngAfterViewInit() {
    // this.initItemProduct();
  }

  addNumber(index: number, quantite: number) {
    const currentItems = this.cartItems();
    const item = currentItems[index];
    if (item) {
      item.quantite += quantite;
      this.cartItems.set([...currentItems]);
      this.priceFinal.set(Number((this.priceFinal() + item.price * quantite).toFixed(2)));
      this.panierService.updatePanierDetail(item._id, item.quantite);
    }
  }

  minusNumber(index: number, quantite: number) {
    const currentItems = this.cartItems();
    const item = currentItems[index];
    if (!item) return;
    const newQuantite = item.quantite - quantite;
    if (newQuantite > 0) {
      item.quantite = newQuantite;
      this.cartItems.set([...currentItems]);
      this.priceFinal.set(Number((this.priceFinal() - item.price * quantite).toFixed(2)));
      this.panierService.updatePanierDetail(item._id, item.quantite);
    } else {
      this.cartItems.set(currentItems.filter((_: any, i: number) => i !== index));
      this.priceFinal.set(Number((this.priceFinal() - item.price * item.quantite).toFixed(2)));
      this.panierService.deleteFromPanier(item._id);
    }
    this.panierService.reloadPanier();

  }

  removeItem(index: number) {
    const currentItems = this.cartItems();
    const item = currentItems[index];
    if (item) {
      this.panierService.deleteFromPanier(item._id);
      this.cartItems.set(currentItems.filter((_: any, i: number) => i !== index));
      this.priceFinal.set(Number((this.priceFinal() - item.price * item.quantite).toFixed(2)));
      this.panierService.reloadPanier();
    }
  }
  // async confirmeAchatClient(){
  //   let idUser = this.userId;
  //   this.commandeService.valideClientCommande(idUser) ;
  // }

  async confirmeAchatClient() {
    this.confirmModal.open({
      theme: 'success',
      title: 'Confirmer votre achat',
      message: 'Vous êtes sur le point de passer commande pour les articles suivants :',
      confirmLabel: `Payer ${this.priceFinal()}MGA`,
      cancelLabel: 'Retour au panier',
      details: this.cartItems().map((i : any) => `${i.nom} × ${i.quantite} — ${i.price}MGA`),
      onConfirm: async () => {
        await this.commandeService.valideClientCommande(this.userId) ;
        await this.panierService.reloadPanier();
        await this.panierService.reloadPanierTermine();
        this.cartItems.set([]);
        this.priceFinal.set(0);
      }
    });
  }

  // async initItemProduct() {
  //   let panier : Panier = null as any;
  //   panier = await this.panierService.initializePanier() as any;
  //   this.cartItems.set(panier.details.map(detail => ({
  //     _id: detail._id,
  //     nom: detail.produit.nom,
  //     boutique: detail.produit.boutique.nom,
  //     price: detail.produit.prixInitial,
  //     quantite: detail.quantite,
  //     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' // Placeholder, à remplacer par detail.produit.image si disponible,
  //   })))
  //   this.priceFinal.set(panier.details.reduce((total, detail) => total + detail.produit.prixInitial * detail.quantite, 0));
  // }

  // orders = [
  //   { id: "#ORD-9821", date: "12 Jan 2026", status: "Livré", total: "245Ar", items: 3 },
  //   { id: "#ORD-9805", date: "05 Jan 2026", status: "En cours", total: "85Ar", items: 1 },
  //   { id: "#ORD-9750", date: "22 Dec 2025", status: "Livré", total: "520Ar", items: 5 },
  // ];
}
