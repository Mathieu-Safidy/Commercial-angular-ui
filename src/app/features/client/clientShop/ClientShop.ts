import { Component, effect, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  ShoppingBag,
  ArrowRight,
  Star,
  Heart,
  TrendingUp,
  Sparkles,
  Check,
} from 'lucide-angular';

// Imports de tes composants UI (assure-toi que les chemins sont corrects)
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { CardComponent, CardContentComponent } from '../../../components/ui/card';
import { ProduitService } from '../../../services/produitService/produit-service';
import { PanierService } from '../../../services/panierService/panier-service';
import { Environments } from '../../../environements/environments';
import { TabsTriggerComponent } from '../../../components/ui/tabs';
import {DetailBoutique} from '../../../model/detailBoutiqueModel';
import {DetailBoutiqueService} from '../../../services/detailBoutiqueService/detail-boutique-service';
import {AuthServices} from '../../../services/authService/auth.services';

@Component({
  selector: 'app-client-shop',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardContentComponent,
    TabsTriggerComponent
  ],
  templateUrl: './ClientShop.html',
})
export class ClientShopComponent {
  // Mapping des icônes
  readonly ShoppingBag = ShoppingBag;
  readonly ArrowRight = ArrowRight;
  readonly Star = Star;
  readonly Heart = Heart;
  readonly TrendingUp = TrendingUp;
  readonly Sparkles = Sparkles;
  readonly Check = Check;
  detailBoutiques: DetailBoutique[] = [];
  authService = inject(AuthServices);
  user: User | any = this.authService.currentUserSubject.value || { } ;
  userId = this.user._id;


  produitService = inject(ProduitService);
  panierService = inject(PanierService);
  hovered = false;
  toggleWishlist(id: string) { /* votre logique */ }
  isWishlisted(id: string): boolean { /* votre logique */ return false; }
  constructor( private detailBoutiqueService: DetailBoutiqueService ) {
    effect(() => {
      const panier = this.panierService.panier();
      if (!panier) return;
      this.panier.set(panier);
    })
  }
  navigateTo = output<string>(); // émet la valeur du tab cible


  goToAllProducts() {
    this.navigateTo.emit('all-products');
  }
  featuredBoutiques = [
    {
      name: 'Eco Luxe',
      category: 'Mode',
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Artisans du Bois',
      category: 'Déco',
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Urban Tech',
      category: 'Électronique',
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1491933382434-50028619b54b?auto=format&fit=crop&q=80&w=800',
    },
  ];

  details = signal<any>([]);

  products = signal<any>([
    {
      id: 1,
      name: 'Montre Minimaliste',
      boutique: 'Eco Luxe',
      price: '129€',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      name: 'Vase Céramique',
      boutique: 'Artisans du Bois',
      price: '45€',
      image:
        'https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 3,
      name: 'Casque ANC',
      boutique: 'Urban Tech',
      price: '299€',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 4,
      name: 'Sac à dos Urbain',
      boutique: 'Eco Luxe',
      price: '85€',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    },
  ]);
  panier = signal<any>(null);
  backendLink = Environments.BACKEND || 'http://localhost:3000'; // Remplace par l'URL de ton backend
  // Helper pour simuler les avatars des abonnés
  subscriberIds = [1, 2, 3];

  ngAfterViewInit() {
    this.initBoutique() ;
    this.initProducts();
  }

  verifInPanier(idProduit: string): boolean {
    if (!this.panier()) return false;
    return this.panier().details.some((detail: PanierDetail) => detail.idProduit === idProduit);
  }
 async initBoutique() {
   this.detailBoutiques = await this.detailBoutiqueService.getAll() as DetailBoutique[];
 }
  async initProducts() {
    // this.panier.set(await this.panierService.getPanier('698dfddc709de29d54628ca1') as Panier)
    // let panierInit = await this.panierService.initializePanier();
    // this.panier.set(panierInit);
    let produits: Produit[] = (await this.produitService.getProduits()) as Produit[];
    console.log(produits);

    this.products.set(
      produits.map((produit) => ({
        id: produit._id,
        name: produit.nom,
        boutique: produit.boutique.nom,
        price: produit.prixInitial + '€',
        image: produit.image ?this.backendLink + '/' + produit.image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', // Placeholder, à remplacer par produit.image si disponible,
      })),
    );
  }

  async addToCart(idProduit: string) {
    let idUser = this.userId;
    let quantite = 1;
    // Appel à ton service pour ajouter le produit au panier
    await this.panierService.addToPanier(idUser, idProduit, quantite);
    let panier = await this.panierService.reloadPanier(); // Recharge le panier pour obtenir les dernières données
    this.panier.set(panier);
    // Logique pour ajouter le produit au panier
    console.log(`Produit ${idProduit} ajouté au panier`);
  }
}
