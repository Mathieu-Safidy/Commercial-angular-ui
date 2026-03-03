import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  Star,
  Store,
  Package,
  ArrowLeft,
  Heart,
  ShoppingBag,
  Check,
  Search,
  X,
  LayoutGrid,
  LayoutList,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  ArrowUpDown,
  Sparkles,
  Users,
  ExternalLink,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { DetailBoutiqueService } from '../../../services/detailBoutiqueService/detail-boutique-service';
import { ProduitService } from '../../../services/produitService/produit-service';
import { PanierService } from '../../../services/panierService/panier-service';
import { AuthServices } from '../../../services/authService/auth.services';
import { DetailBoutique } from '../../../model/detailBoutiqueModel';
import { Environments } from '../../../environements/environments';
import { Avis } from '../detailProduit/DetailProduit';
import { NoteService } from '../../../services/noteService/note-service';
import { Note } from '../../../model/noteModel';

@Component({
  selector: 'app-boutique-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ButtonComponent, BadgeComponent],
  templateUrl: './boutiqueDetail.html',
})
export class BoutiqueDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private detailBoutiqueService = inject(DetailBoutiqueService);
  private produitService = inject(ProduitService);
  private panierService = inject(PanierService);
  private authService = inject(AuthServices);
  private noteService = inject(NoteService);

  readonly Star = Star;
  readonly Store = Store;
  readonly Package = Package;
  readonly ArrowLeft = ArrowLeft;
  readonly Heart = Heart;
  readonly ShoppingBag = ShoppingBag;
  readonly Check = Check;
  readonly Search = Search;
  readonly X = X;
  readonly LayoutGrid = LayoutGrid;
  readonly LayoutList = LayoutList;
  readonly ChevronDown = ChevronDown;
  readonly MapPin = MapPin;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly ArrowUpDown = ArrowUpDown;
  readonly Sparkles = Sparkles;
  readonly Users = Users;
  readonly ExternalLink = ExternalLink;

  backendLink = Environments.BACKEND || 'http://localhost:3000';
  subscriberIds = [1, 2, 3, 4, 5];

  // ── State ──
  boutique = signal<DetailBoutique | null>(null);
  allProduits = signal<(Produit & { note?: number })[]>([]);
  panier = signal<any>(null);
  isLoading = signal(true);
  notFound = signal(false);
  isAbonne = signal(false);
  wishlist = signal<string[]>([]);

  // Filtres produits
  searchQuery = signal('');
  sortBy = signal<'nom' | 'prix-asc' | 'prix-desc' | 'stock'>('nom');
  viewMode = signal<'grid' | 'list'>('grid');
  sortDropdownOpen = signal(false);
  inStockOnly = signal(false);

    avisProduits = signal<Record<string, Avis[]>>({});

  // Pagination
  readonly PAGE_SIZE = 12;
  currentPage = signal(1);

  // ── Computed ──
  filteredProduits = computed(() => {
    let list : (Produit & { note?: number })[] = [...this.allProduits()];
    const q = this.searchQuery().toLowerCase().trim();

    if (q) {
      list = list.filter(
        (p) => p.nom?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q),
      );
    }

    if (this.inStockOnly()) {
      list = list.filter((p) => p.quantiteDisponible > 0);
    }

    switch (this.sortBy()) {
      case 'nom':
        list.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case 'prix-asc':
        list.sort((a, b) => a.prixInitial - b.prixInitial);
        break;
      case 'prix-desc':
        list.sort((a, b) => b.prixInitial - a.prixInitial);
        break;
      case 'stock':
        list.sort((a, b) => b.quantiteDisponible - a.quantiteDisponible);
        break;
    }

    return list;
  });

  totalPages = computed(() => Math.ceil(this.filteredProduits().length / this.PAGE_SIZE));

  pagedProduits = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.filteredProduits().slice(start, start + this.PAGE_SIZE);
  });

  toggleWishlist(idProduit: string) {
    this.wishlist.update((list) =>
      list.includes(idProduit) ? list.filter((id) => id !== idProduit) : [...list, idProduit],
    );
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

  getNomCategorie(b: DetailBoutique): string {
    return ((b.idBoutique as Boutique)?.idCategorie as Categorie)?.nom ?? 'Inconnu';
  }

  getNomBoutique(b: DetailBoutique): string {
    return (b.idBoutique as Boutique)?.nom ?? 'Boutique inconnue';
  }

  enStockCount(): number {
    return this.allProduits().filter((p) => p.quantiteDisponible > 0).length;
  }

  pageNumbers = computed((): (number | null)[] => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | null)[] = [1];
    if (current > 3) pages.push(null);
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++)
      pages.push(i);
    if (current < total - 2) pages.push(null);
    pages.push(total);
    return pages;
  });

  stats = computed(() => {
    const b = this.boutique();
    return [
      { label: 'Produits', value: this.allProduits().length.toString(), icon: 'package' },
      { label: 'Note', value: b?.noteMoyen?.toFixed(1) ?? '—', icon: 'star' },
      { label: 'Abonnés', value: '50+', icon: 'users' },
      {
        label: 'En stock',
        value: this.allProduits()
          .filter((p) => p.quantiteDisponible > 0)
          .length.toString(),
        icon: 'check',
      },
    ];
  });

  sortOptions = [
    { value: 'nom', label: 'Nom A–Z' },
    { value: 'prix-asc', label: 'Prix croissant' },
    { value: 'prix-desc', label: 'Prix décroissant' },
    { value: 'stock', label: 'Stock disponible' },
  ];

  calculeMoyenneBoutique(): number {
    const produits = this.allProduits();
    if (produits.length === 0) return 0;
    const total = produits.reduce((sum, p) => sum + (p.note ?? 0), 0);
    return total / produits.length;
   }

  // ── Init ──
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/acceuil/client']);
      return;
    }

    const user = this.authService.currentUserSubject?.value;

    try {
      // Charger le détail boutique
      const data = (await this.detailBoutiqueService.getAll()) as DetailBoutique[];
      const found = data.find((b) => (b.idBoutique?._id ?? b._id) === id);
      if (!found) {
        this.notFound.set(true);
        return;
      }
      this.boutique.set(found);
      // Charger les produits de la boutique
      const produits = (await this.produitService.getProduits()) as Produit[];
      let avis = await this.initAvis(produits);
      console.log('Avis',avis);
      console.log(avis);
      const boutiqueId = found.idBoutique?._id ?? found._id;
      const produitsBoutique = produits
        .filter(
          (p) =>
            (p.boutique?._id ?? p.idBoutique) === boutiqueId ||
            p.boutique?.nom === found.idBoutique?.nom,
        )
        .map((p) => {
            let note = this.calculeMoyenne(avis[p._id] || []);
            console.log(`Produit ${p.nom} (${p._id}) - Note moyenne: ${note}`);
            return {
            ...p,
            note,
            image: p.image
                ? p.image.startsWith('http')
                ? p.image
                : this.backendLink + '/' + p.image
                : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        }}
    
        );
      this.allProduits.set(produitsBoutique);
      console.log(this.allProduits());

      // Panier
      if (user?._id) {
        const panier = await this.panierService.reloadPanier();
        this.panier.set(panier);
      }
    } catch (e) {
      console.error('Erreur chargement boutique', e);
      this.notFound.set(true);
    } finally {
      this.isLoading.set(false);
    }
  }

  calculeMoyenne(notes: Avis[]): number {
    if (notes.length === 0) return 0;
    const total = notes.reduce((sum, n) => sum + n.note, 0);
    return total / notes.length;
  }

  // ── Helpers ──
  getBoutiqueImage(): string {
    const b = this.boutique();
    if (!b?.idBoutique.image)
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80';
    return b.idBoutique.image.startsWith('http') ? b.idBoutique.image : this.backendLink + '/' + b.idBoutique.image;
  }

  getStars(note: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(note));
  }

  verifInPanier(idProduit: string): boolean {
    if (!this.panier()) return false;
    return this.panier().details?.some((d: any) => d.idProduit === idProduit) ?? false;
  }

  isWishlisted(idProduit: string): boolean {
    return this.wishlist().includes(idProduit);
}

  async addToCart(idProduit: string) {
    const user = this.authService.currentUserSubject?.value;
    if (!user?._id) return;
    await this.panierService.addToPanier(user._id, idProduit, 1);
    const panier = await this.panierService.reloadPanier();
    this.panier.set(panier);
  }

  toggleAbonne() {
    this.isAbonne.update((v) => !v);
  }

  setSort(v: string) {
    this.sortBy.set(v as any);
    this.sortDropdownOpen.set(false);
    this.currentPage.set(1);
  }

  getSortLabel(): string {
    return this.sortOptions.find((o) => o.value === this.sortBy())?.label ?? 'Trier';
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openDetail(p: Produit) {
    this.router.navigate(['/acceuil/client/produit', p._id]);
  }

  formatPrice(n: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MGA' }).format(n);
  }

  minVal(a: number, b: number) {
    return Math.min(a, b);
  }
  trackById(_: number, item: any) {
    return item._id;
  }
}
