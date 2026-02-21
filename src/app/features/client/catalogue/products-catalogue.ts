import {
  Component,
  signal,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, SlidersHorizontal, X, Heart, ShoppingBag, Check, Star, LayoutGrid, LayoutList, ChevronDown, Sparkles, ArrowUpDown, Package } from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { CountByCategoryPipe } from '../../../pipe/countByCategorie-pipe';

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
  panier = signal<string[]>([]);
  sortDropdownOpen = signal(false);

  // Expandable filter sections
  categoryExpanded = signal(true);
  boutiqueExpanded = signal(true);
  priceExpanded = signal(true);
  stockExpanded = signal(false);
  inStockOnly = signal(false);

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'En vedette' },
    { value: 'newest', label: 'Nouveautés' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Mieux notés' },
  ];

  // Mock data - remplacez par votre service
  allProducts = signal<Product[]>([
    { id: '1', name: 'Ordinateur portable HP EliteBook', price: 1200, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', boutique: 'Massin Tech', category: 'Informatique', rating: 4.8, stock: 3, isNew: true },
    { id: '2', name: 'Casque Sony WH-1000XM5', price: 350, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', boutique: 'AudioPro', category: 'Électronique', rating: 4.9, stock: 12 },
    { id: '3', name: 'Montre Minimaliste Acier', price: 129, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', boutique: 'TimeShop', category: 'Accessoires', rating: 4.6, stock: 8, isSale: true, salePercent: 20 },
    { id: '4', name: 'Vase Céramique Artisanal', price: 45, image: 'https://images.unsplash.com/photo-1581557991964-125469da3b8a?w=400&q=80', boutique: 'Déco & Art', category: 'Maison', rating: 4.4, stock: 5 },
    { id: '5', name: 'Sac à dos Urbain 30L', price: 85, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', boutique: 'UrbanStyle', category: 'Mode', rating: 4.7, stock: 24 },
    { id: '6', name: 'Lampe de Bureau LED', price: 68, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80', boutique: 'Massin Tech', category: 'Maison', rating: 4.3, stock: 0 },
    { id: '7', name: 'Clavier Mécanique RGB', price: 145, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80', boutique: 'Massin Tech', category: 'Informatique', rating: 4.7, stock: 15, isNew: true },
    { id: '8', name: 'Sneakers Running Pro', price: 120, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', boutique: 'SportZone', category: 'Sport', rating: 4.5, stock: 9, isSale: true, salePercent: 15 },
    { id: '9', name: 'Parfum Ambré Intense', price: 89, image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80', boutique: 'Beauté Pure', category: 'Beauté', rating: 4.8, stock: 6 },
    { id: '10', name: 'Tablette Graphique Pro', price: 299, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80', boutique: 'Massin Tech', category: 'Informatique', rating: 4.6, stock: 4 },
    { id: '11', name: 'Vélo Électrique Urbain', price: 1890, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80', boutique: 'SportZone', category: 'Sport', rating: 4.9, stock: 2, isNew: true },
    { id: '12', name: 'Cafetière Italienne', price: 38, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', boutique: 'Déco & Art', category: 'Maison', rating: 4.2, stock: 30 },
  ]);

  categories = computed(() => [...new Set(this.allProducts().map(p => p.category))].sort());
  boutiques = computed(() => [...new Set(this.allProducts().map(p => p.boutique))].sort());
  
  trackById(index: number, product: Product): string {
    return product.id;
  }
  filteredProducts = computed(() => {
    let products = [...this.allProducts()];
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.boutique.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    const cats = this.selectedCategories();
    if (cats.length) products = products.filter(p => cats.includes(p.category));

    const bouts = this.selectedBoutiques();
    if (bouts.length) products = products.filter(p => bouts.includes(p.boutique));

    const { min, max } = this.priceRange();
    products = products.filter(p => p.price >= min && p.price <= max);

    if (this.inStockOnly()) products = products.filter(p => p.stock > 0);


    switch (this.sortBy()) {
      case 'price-asc': products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'rating': products.sort((a, b) => b.rating - a.rating); break;
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

  ngOnInit() {
    const prices = this.allProducts().map(p => p.price);
    this.maxPriceValue.set(Math.max(...prices));
    this.priceRange.set({ min: 0, max: Math.max(...prices) });
  }

  toggleCategory(cat: string) {
    this.selectedCategories.update(cats =>
      cats.includes(cat) ? cats.filter(c => c !== cat) : [...cats, cat]
    );
  }

  toggleBoutique(b: string) {
    this.selectedBoutiques.update(bouts =>
      bouts.includes(b) ? bouts.filter(x => x !== b) : [...bouts, b]
    );
  }

  updateMaxPrice(event: Event) {
    const val = +(event.target as HTMLInputElement).value;
    this.priceRange.update(r => ({ ...r, max: val }));
  }

  resetFilters() {
    this.selectedCategories.set([]);
    this.selectedBoutiques.set([]);
    this.priceRange.set({ min: 0, max: this.maxPriceValue() });
    this.inStockOnly.set(false);
    this.searchQuery.set('');
  }

  setSort(s: SortOption) {
    this.sortBy.set(s);
    this.sortDropdownOpen.set(false);
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
    return this.panier().includes(id);
  }

  addToCart(id: string) {
    this.panier.update(p => p.includes(id) ? p : [...p, id]);
  }

  formatPrice(p: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(p);
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }
}
