import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  Search, X, SlidersHorizontal, LayoutGrid, LayoutList,
  Star, Store, MapPin, Package, ChevronDown, Users, ArrowRight,
  ShoppingBag, Sparkles,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { DetailBoutiqueService } from '../../../services/detailBoutiqueService/detail-boutique-service';
import { DetailBoutique } from '../../../model/detailBoutiqueModel';
import { Environments } from '../../../environements/environments';

@Component({
  selector: 'app-boutiques-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
  ],
  templateUrl: './BoutiqueCatalogue.html',
})
export class BoutiquesCatalogueComponent implements OnInit {
  private detailBoutiqueService = inject(DetailBoutiqueService);
  private router = inject(Router);

  readonly Search = Search;
  readonly X = X;
  readonly SlidersHorizontal = SlidersHorizontal;
  readonly LayoutGrid = LayoutGrid;
  readonly LayoutList = LayoutList;
  readonly Star = Star;
  readonly Store = Store;
  readonly MapPin = MapPin;
  readonly Package = Package;
  readonly ChevronDown = ChevronDown;
  readonly Users = Users;
  readonly ArrowRight = ArrowRight;
  readonly ShoppingBag = ShoppingBag;
  readonly Sparkles = Sparkles;

  backendLink = Environments.BACKEND || 'http://localhost:3000';
  subscriberIds = [1, 2, 3];

  // ── State ──
  allBoutiques = signal<DetailBoutique[]>([]);
  isLoading = signal(true);

  searchQuery = signal('');
  viewMode = signal<'grid' | 'list'>('grid');
  filtersOpen = signal(true);
  sortDropdownOpen = signal(false);
  sortBy = signal<'nom' | 'note-desc' | 'note-asc' | 'produits'>('note-desc');

  // Filtres
  selectedCategories = signal<string[]>([]);
  minNote = signal(0);
  categoryExpanded = signal(true);
  noteExpanded = signal(true);

  // Pagination
  readonly PAGE_SIZE = 12;
  currentPage = signal(1);

  // ── Computed ──
  categories = computed(() => {
    const cats = this.allBoutiques()
      .map(b => ((b.idBoutique as Boutique)?.idCategorie as Categorie)?.nom)
      .filter(Boolean) as string[];
    return [...new Set(cats)].sort();
  });

  getNomCategorie(b: DetailBoutique): string {
    return ((b.idBoutique as Boutique)?.idCategorie as Categorie)?.nom ?? 'Inconnu';
  }

  getNomBoutique(b: DetailBoutique): string {
    return (b.idBoutique as Boutique)?.nom ?? 'Boutique inconnue';
  }

//   ouvrirBoutique(b: DetailBoutique) {
//     this.router.navigate(['/acceuil/client/boutique', b.idBoutique?._id ?? b._id]);
//   }

  countByCategory(cat: string): number {
    return this.allBoutiques().filter(b => this.getNomCategorie(b) === cat).length;
}

  filteredBoutiques = computed(() => {
    let list = [...this.allBoutiques()];
    const q = this.searchQuery().toLowerCase().trim();

    // Recherche
    if (q) {
      list = list.filter(b =>
        b.idBoutique?.nom?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q) ||
        (((b.idBoutique as Boutique)?.idCategorie as Categorie)?.nom)?.toLowerCase().includes(q)
      );
    }

    // Filtre catégories
    if (this.selectedCategories().length > 0) {
      list = list.filter(b => this.selectedCategories().includes(((b.idBoutique as Boutique)?.idCategorie as Categorie)?.nom ?? ''));
    }

    // Filtre note minimum
    if (this.minNote() > 0) {
      list = list.filter(b => (b.noteMoyen ?? 0) >= this.minNote());
    }

    // Tri
    switch (this.sortBy()) {
      case 'nom':
        list.sort((a, b) => ((a.idBoutique as Boutique)?.nom ?? '').localeCompare(((b.idBoutique as Boutique)?.nom ?? '')));
        break;
      case 'note-desc':
        list.sort((a, b) => (b.noteMoyen ?? 0) - (a.noteMoyen ?? 0));
        break;
      case 'note-asc':
        list.sort((a, b) => (a.noteMoyen ?? 0) - (b.noteMoyen ?? 0));
        break;
    //   case 'produits':
    //     list.sort((a, b) => (b.nombreProduits ?? 0) - (a.nombreProduits ?? 0));
    //     break;
    }

    return list;
  });

  totalPages = computed(() => Math.ceil(this.filteredBoutiques().length / this.PAGE_SIZE));

  pagedBoutiques = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.filteredBoutiques().slice(start, start + this.PAGE_SIZE);
  });

  pageNumbers = computed((): (number | null)[] => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | null)[] = [1];
    if (current > 3) pages.push(null);
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push(null);
    pages.push(total);
    return pages;
  });

  activeFiltersCount = computed(() => {
    let count = 0;
    if (this.selectedCategories().length > 0) count += this.selectedCategories().length;
    if (this.minNote() > 0) count++;
    return count;
  });

  sortOptions = [
    { value: 'note-desc', label: 'Mieux notées' },
    { value: 'note-asc', label: 'Moins bien notées' },
    { value: 'nom', label: 'Nom A–Z' },
    { value: 'produits', label: 'Plus de produits' },
  ];

  // ── Init ──
  async ngOnInit() {
    this.isLoading.set(true);
    try {
      const data = await this.detailBoutiqueService.getAll() as DetailBoutique[];
      this.allBoutiques.set(data);
    } catch (e) {
      console.error('Erreur chargement boutiques', e);
    } finally {
      this.isLoading.set(false);
    }
  }

  // ── Helpers ──
  getImage(b: DetailBoutique): string {
    if (!b.idBoutique.image) return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80';
    return b.idBoutique.image.startsWith('http') ? b.idBoutique.image : this.backendLink + '/' + b.idBoutique.image;
  }

  getStars(note: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(note));
  }

  toggleCategory(cat: string) {
    this.selectedCategories.update(cats =>
      cats.includes(cat) ? cats.filter(c => c !== cat) : [...cats, cat]
    );
    this.currentPage.set(1);
  }

  resetFilters() {
    this.selectedCategories.set([]);
    this.minNote.set(0);
    this.searchQuery.set('');
    this.currentPage.set(1);
  }

  setSort(value: string) {
    this.sortBy.set(value as any);
    this.sortDropdownOpen.set(false);
    this.currentPage.set(1);
  }

  getSortLabel(): string {
    return this.sortOptions.find(o => o.value === this.sortBy())?.label ?? 'Trier';
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  minVal(a: number, b: number) { return Math.min(a, b); }

  ouvrirBoutique(b: DetailBoutique) {
    this.router.navigate(['/acceuil/client/boutique', b.idBoutique?._id ?? b._id]);
  }

  trackById(_: number, item: DetailBoutique) {
    return item._id ?? item.idBoutique?._id;
  }
}