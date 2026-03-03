import {
  Component,
  signal,
  computed,
  inject,
  OnInit,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, SlidersHorizontal, X, Heart, ShoppingBag, Check, Star, LayoutGrid, LayoutList, ChevronDown, Sparkles, ArrowUpDown, Package } from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { CountByCategoryPipe } from '../../../pipe/countByCategorie-pipe';
import { ProduitService } from '../../../services/produitService/produit-service';
import { Environments } from '../../../environements/environments';
import { PanierService } from '../../../services/panierService/panier-service';
import { AlertDialogService } from '../../../components/ui/alert-dialog/alert-dialog.service';
import {AuthServices} from '../../../services/authService/auth.services';
import { Router } from '@angular/router';
import { Avis } from '../detailProduit/DetailProduit';
import { NoteService } from '../../../services/noteService/note-service';
import { Note } from '../../../model/noteModel';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  boutique: string;
  category: string;
  rating: number;
  stock: number;
  isNew?: boolean;
  isSale?: boolean;
  salePercent?: number;
  description?: string;

}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
type ViewMode = 'grid' | 'list';

@Component({
  selector: 'app-products-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CountByCategoryPipe
  ],
  templateUrl: './products-catalogue.html',
})
export class ProductsCatalogueComponent implements OnInit {

  // Icons
  readonly Search = Search;
  readonly SlidersHorizontal = SlidersHorizontal;
  readonly X = X;
  readonly Heart = Heart;
  readonly ShoppingBag = ShoppingBag;
  readonly Check = Check;
  readonly Star = Star;
  readonly LayoutGrid = LayoutGrid;
  readonly LayoutList = LayoutList;
  readonly ChevronDown = ChevronDown;
  readonly Sparkles = Sparkles;
  readonly ArrowUpDown = ArrowUpDown;
  readonly Package = Package;
  private router = inject(Router);
  authService = inject(AuthServices);
  user: User | any = this.authService.currentUserSubject.value || { } ;
  userId = this.user._id;


  // State
  searchQuery = signal('');
  selectedCategories = signal<string[]>([]);
  selectedBoutiques = signal<string[]>([]);
  priceRange = signal<{ min: number; max: number }>({ min: 0, max: 5000 });
  maxPriceValue = signal(5000);
  sortBy = signal<SortOption>('featured');
  viewMode = signal<ViewMode>('grid');
  filtersOpen = signal(false);
  wishlist = signal<string[]>([]);
  panier = signal<any & { details: any[] }>({ details: [] });
  sortDropdownOpen = signal(false);

  // Expandable filter sections
  categoryExpanded = signal(true);
  boutiqueExpanded = signal(true);
  priceExpanded = signal(true);
  stockExpanded = signal(false);
  inStockOnly = signal(false);
  avisProduits = signal<Record<string, Avis[]>>({});

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'En vedette' },
    { value: 'newest', label: 'Nouveautés' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Mieux notés' },
  ];

  // Mock data - remplacez par votre service
  allProducts = signal<Produit[] & { isSale?: boolean; salePercent?: number ; isNew?: boolean ; rating?: number }>([
    // { id: '1', name: 'Ordinateur portable HP EliteBook', price: 1200, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', boutique: 'Massin Tech', category: 'Informatique', rating: 4.8, stock: 3, isNew: true },
    // { id: '2', name: 'Casque Sony WH-1000XM5', price: 350, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', boutique: 'AudioPro', category: 'Électronique', rating: 4.9, stock: 12 },
    // { id: '3', name: 'Montre Minimaliste Acier', price: 129, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', boutique: 'TimeShop', category: 'Accessoires', rating: 4.6, stock: 8, isSale: true, salePercent: 20 },
    // { id: '4', name: 'Vase Céramique Artisanal', price: 45, image: 'https://images.unsplash.com/photo-1581557991964-125469da3b8a?w=400&q=80', boutique: 'Déco & Art', category: 'Maison', rating: 4.4, stock: 5 },
    // { id: '5', name: 'Sac à dos Urbain 30L', price: 85, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', boutique: 'UrbanStyle', category: 'Mode', rating: 4.7, stock: 24 },
    // { id: '6', name: 'Lampe de Bureau LED', price: 68, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80', boutique: 'Massin Tech', category: 'Maison', rating: 4.3, stock: 0 },
    // { id: '7', name: 'Clavier Mécanique RGB', price: 145, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80', boutique: 'Massin Tech', category: 'Informatique', rating: 4.7, stock: 15, isNew: true },
    // { id: '8', name: 'Sneakers Running Pro', price: 120, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', boutique: 'SportZone', category: 'Sport', rating: 4.5, stock: 9, isSale: true, salePercent: 15 },
    // { id: '9', name: 'Parfum Ambré Intense', price: 89, image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80', boutique: 'Beauté Pure', category: 'Beauté', rating: 4.8, stock: 6 },
    // { id: '10', name: 'Tablette Graphique Pro', price: 299, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80', boutique: 'Massin Tech', category: 'Informatique', rating: 4.6, stock: 4 },
    // { id: '11', name: 'Vélo Électrique Urbain', price: 1890, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80', boutique: 'SportZone', category: 'Sport', rating: 4.9, stock: 2, isNew: true },
    // { id: '12', name: 'Cafetière Italienne', price: 38, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', boutique: 'Déco & Art', category: 'Maison', rating: 4.2, stock: 30 },
    // { id: '13', name: 'Lampe de Table Design', price: 55, image: 'https://images.unsplash.com/photo-1580228723040-8c1c7f0f8c9e?w=400&q=80', boutique: 'Déco & Art', category: 'Maison', rating: 4.5, stock: 12 },
    // { id: '14', name: 'Tasse Céramique Artisanale', price: 12, image: 'https://images.unsplash.com/photo-1567620979363-4b7b8f8e6c9d?w=400&q=80', boutique: 'Déco & Art', category: 'Maison', rating: 4.3, stock: 25 },
  ]);

  constructor() {
     effect(() => {
       const prod = this.produitService.produitSelectionne();
      if (prod) {
        this.dialog.show(); // ← on utilise le service !
      } else {
        this.produitService.produitSelectionne.set(null);
        this.dialog.close();
      }
      const panier = this.panierService.panier();
      if (!panier) return;
      this.panier.set(panier);
    })
  }


  openDetails(product: Produit) {
    // this.produitService.produitSelectionne.set(product);
    // this.dialog.show();
    console.log('Navigate to:', product._id);
    console.log('Mandeha');
    
    this.router.navigate(['/acceuil/client/produit', product._id]);
  }

  ngAfterViewInit() {
    this.initProducts();
  }
  dialog = inject(AlertDialogService);
  produitService = inject(ProduitService);
  panierService = inject(PanierService);
  noteService = inject(NoteService);
  backendLink = Environments.BACKEND || 'http://localhost:3000';
  async initProducts() {
    // this.panier.set(await this.panierService.€r('698dfddc709de29d54628ca1') as Panier)
    // let panierInit = await this.panierService.initializePanier();
    // this.panier.set(panierInit);
    let produits: Produit[] = (await this.produitService.getProduits()) as Produit[];
    console.log(produits);
    let avisMap = await this.initAvis(produits);

    this.allProducts.set(produits.filter(p => p.boutique && p.boutique.nom).map((produit) => ({
      ...produit,
      rating: this.calculeMoyenne(avisMap[produit._id] || []),
      image: produit.image ? this.backendLink + '/' + produit.image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400', // Placeholder, à remplacer par produit.image si disponible,
    })));

    const prices = this.allProducts().map(p => p.prixInitial);
    this.maxPriceValue.set(Math.max(...prices));
    this.priceRange.set({ min: 0, max: Math.max(...prices) });
      // produits.map((produit) => ({
      //   id: produit._id,
      //   name: produit.nom,
      //   boutique: produit.boutique.nom,
      //   price: produit.prixInitial,
      //   category: produit.idCategorie.nom,
      //   stock: produit.quantiteDisponible,
      //   rating: 4.5, // Remplacez par la vraie note si disponible
      //   // isNew: (new Date().getTime() - new Date(produit.createdAt).getTime()) < 30 * 24 * 60 * 60 * 1000, // Nouveau si créé il y a moins de 30 jours
      //   isNew: false, // Nouveau si créé il y a moins de 30 jours
      //   isSale: false, // À définir selon votre logique de promotion
      //   salePercent: 0, // À définir selon votre logique de promotion
      //   image: produit.image ?this.backendLink + '/' + produit.image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', // Placeholder, à remplacer par produit.image si disponible,
      // })),

    // );
    console.log('All product ',this.allProducts());

  }
  calculeMoyenne(notes: Avis[]): number {
    if (notes.length === 0) return 0;
    const total = notes.reduce((sum, n) => sum + n.note, 0);
    return total / notes.length;
  }

   async initAvis(produits: Produit[] = []) {
      // const produits = this.allProduits();
      const avisMap: Record<string, Avis[]> = {};
      for (const p of produits) {
        let avis = await this.noteService.getNotesByProduitId(p._id);
        avisMap[p._id] = avis.map((n: Note) => ({
                  _id: n._id,
                  idProduit: n.idProduit,
                  idUser: n.idUser._id,
                  nomUser: n.idUser.username, // À remplacer par le nom réel de l'utilisateur (nécessite une requête supplémentaire)
                  avatarSeed: n.idUser.username,
                  note: n.nombreEtoiles,
                  commentaire: n.commentaire,
                  date: n.createdAt,
                  likes: 0, // À remplacer par le nombre réel de likes (nécessite une requête supplémentaire)
                  userLiked: false, // À déterminer si l'utilisateur actuel a aimé cette note (nécessite une requête supplémentaire) 
              }));
      }
      this.avisProduits.set(avisMap);
      return avisMap;
    }

  categories = computed(() => [...new Set(this.allProducts().map(p => p.idCategorie.nom))].sort());
  boutiques = computed(() => [...new Set(this.allProducts().map(p => p.boutique.nom))].sort());

  filteredProducts = computed(() => {
    let products = [...this.allProducts()];
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      products = products.filter(p =>
        p.nom.toLowerCase().includes(q) ||
        p.boutique.nom.toLowerCase().includes(q) ||
        p.idCategorie.nom.toLowerCase().includes(q)
      );
    }
    const cats = this.selectedCategories();
    if (cats.length) products = products.filter(p => cats.includes(p.idCategorie.nom));

    const bouts = this.selectedBoutiques();
    if (bouts.length) products = products.filter(p => bouts.includes(p.boutique.nom));

    const { min, max } = this.priceRange();
    products = products.filter(p => p.prixInitial >= min && p.prixInitial <= max);

    if (this.inStockOnly()) products = products.filter(p => p.quantiteDisponible > 0);

    switch (this.sortBy()) {
      case 'price-asc': products.sort((a, b) => a.prixInitial - b.prixInitial); break;
      case 'price-desc': products.sort((a, b) => b.prixInitial - a.prixInitial); break;
      case 'rating': products.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
      case 'newest': products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return products;
  });

  activeFiltersCount = computed(() => {
    let count = 0;
    if (this.selectedCategories().length) count++;
    if (this.selectedBoutiques().length) count++;
    if (this.priceRange().min > 0 || this.priceRange().max < this.maxPriceValue()) count++;
    if (this.inStockOnly()) count++;
    return count;
  });


  // ── Pagination ──
  readonly PAGE_SIZE = 12;
  currentPage = signal(1);

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredProducts().length / this.PAGE_SIZE))
  );

  pagedProducts = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.PAGE_SIZE;
    return this.filteredProducts().slice(start, start + this.PAGE_SIZE);
  });

  // Tableau de numéros de pages avec ellipsis (null = "…")
  pageNumbers = computed((): (number | null)[] => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | null)[] = [1];
    if (current > 3) pages.push(null);
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push(null);
    pages.push(total);
    return pages;
  });

  goToPage(page: number) {
    const total = this.totalPages();
    if (page < 1 || page > total) return;
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
    // const prices = this.allProducts().map(p => p.prixInitial);
    // this.maxPriceValue.set(Math.max(...prices));
    // this.priceRange.set({ min: 0, max: Math.max(...prices) });
  }

  toggleCategory(cat: string) {
    this.selectedCategories.update(cats =>
      cats.includes(cat) ? cats.filter(c => c !== cat) : [...cats, cat]
    );
    this.currentPage.set(1);
  }

  toggleBoutique(b: string) {
    this.selectedBoutiques.update(bouts =>
      bouts.includes(b) ? bouts.filter(x => x !== b) : [...bouts, b]
    );
    this.currentPage.set(1);
  }

  updateMaxPrice(event: Event) {
    const val = +(event.target as HTMLInputElement).value;
    this.priceRange.update(r => ({ ...r, max: val }));
    this.currentPage.set(1);
  }

  resetFilters() {
    this.selectedCategories.set([]);
    this.selectedBoutiques.set([]);
    this.priceRange.set({ min: 0, max: this.maxPriceValue() });
    this.inStockOnly.set(false);
    this.searchQuery.set('');
    this.currentPage.set(1);
  }

  setSort(s: SortOption) {
    this.sortBy.set(s);
    this.sortDropdownOpen.set(false);
    this.currentPage.set(1);
  }

  getSortLabel(): string {
    return this.sortOptions.find(o => o.value === this.sortBy())?.label ?? '';
  }

  toggleWishlist(id: string) {
    this.wishlist.update(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  }

  isWishlisted(id: string): boolean {
    return this.wishlist().includes(id);
  }

  verifInPanier(id: string): boolean {
    // return this.panier().includes(id);
    if (!this.panier()) return false;
    // console.log(this.panier());

    return this.panier().details.some((detail: PanierDetail) => detail.idProduit === id);
  }

  async addToCart(id: string) {
    // this.panier.update(p => p.includes(id) ? p : [...p, id]);
    let idUser = this.userId;
    let quantite = 1;
    // Appel à ton service pour ajouter le produit au panier
    await this.panierService.addToPanier(idUser, id, quantite);
    let panier = await this.panierService.reloadPanier(); // Recharge le panier pour obtenir les dernières données
    this.panier.set(panier);
    // Logique pour ajouter le produit au panier
    console.log(`Produit ${id} ajouté au panier`);
  }
  // verifInPanier(idProduit: string): boolean {
  //   if (!this.panier()) return false;
  //   return this.panier().details.some((detail: PanierDetail) => detail.idProduit === idProduit);
  // }

  formatPrice(p: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MGA' }).format(p);
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }

  minVal(a: number, b: number): number {
    return Math.min(a, b);
  }

  trackById(_: number, product: Produit): string {
    return product._id;
  }

  // async addToCart(idProduit: string) {
  //   let idUser = "698dfddc709de29d54628ca1";
  //   let quantite = 1;
  //   // Appel à ton service pour ajouter le produit au panier
  //   await this.panierService.addToPanier(idUser, idProduit, quantite);
  //   let panier = await this.panierService.reloadPanier(); // Recharge le panier pour obtenir les dernières données
  //   this.panier.set(panier);
  //   // Logique pour ajouter le produit au panier
  //   console.log(`Produit ${idProduit} ajouté au panier`);
  // }
}
