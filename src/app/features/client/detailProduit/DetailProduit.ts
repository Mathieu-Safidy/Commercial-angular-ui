import { Component, inject, input, signal, computed, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  LucideAngularModule,
  Star, Heart, ShoppingBag, Check, Share2,
  Store, ChevronRight, Package, Shield,
  ThumbsUp, MessageSquare, Send, X, ChevronLeft, ChevronDown,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from '../../../services/authService/auth.services';
import { ProduitService } from '../../../services/produitService/produit-service';
import { PanierService } from '../../../services/panierService/panier-service';
import { Note } from '../../../model/noteModel';
import { NoteService } from '../../../services/noteService/note-service';
export interface Avis {
  _id: string;
  idProduit: string;
  idUser: string;
  nomUser: string;
  avatarSeed: string;
  note: number;
  commentaire: string;
  date: Date;
  likes: number;
  userLiked?: boolean;
}

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
  ],
  templateUrl: './DetailProduit.html',
})
export class ProductDetailPageComponent implements OnInit {
  // ── Inputs ──
  private route = inject(ActivatedRoute);
  private panierService = inject(PanierService);
  private authService = inject(AuthServices);
  private noteService = inject(NoteService);
//   private authService = inject(AuthServices);
   private router = inject(Router);
   private produitService = inject(ProduitService);
   
  produit = signal<Produit | null>(null);
  onClose = input<() => void>(() => {});

  private fb = inject(FormBuilder);

  readonly Star = Star;
  readonly Heart = Heart;
  readonly ShoppingBag = ShoppingBag;
  readonly Check = Check;
  readonly Share2 = Share2;
  readonly Store = Store;
  readonly ChevronRight = ChevronRight;
  readonly Package = Package;
  readonly Shield = Shield;
  readonly ThumbsUp = ThumbsUp;
  readonly MessageSquare = MessageSquare;
  readonly Send = Send;
  readonly X = X;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronDown = ChevronDown;

  // ── State ──
  wishlist = signal(false);
  inPanier = signal(false);
  selectedImageIndex = signal(0);
  reviewsExpanded = signal(true);
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  hoverRating = signal(0);
  backendLink = 'http://localhost:3000';
panier = signal<any>(null);

  // ── Avis mock (remplacer par service) ──
  avis = signal<Avis[]>([
    {
      _id: '1', idProduit: '1', idUser: 'u1', nomUser: 'Sophie M.',
      avatarSeed: 'sophie', note: 5, likes: 12, userLiked: false,
      commentaire: 'Produit absolument incroyable ! La qualité dépasse mes attentes. La livraison était rapide et l\'emballage soigné. Je recommande vivement.',
      date: new Date('2026-02-10'),
    },
    {
      _id: '2', idProduit: '1', idUser: 'u2', nomUser: 'Marc L.',
      avatarSeed: 'marc', note: 4, likes: 7, userLiked: false,
      commentaire: 'Très bon rapport qualité-prix. Quelques petits défauts mineurs mais dans l\'ensemble c\'est un excellent achat.',
      date: new Date('2026-01-28'),
    },
    {
      _id: '3', idProduit: '1', idUser: 'u3', nomUser: 'Emma R.',
      avatarSeed: 'emma', note: 5, likes: 3, userLiked: true,
      commentaire: 'Parfait ! Exactement comme décrit. Le vendeur est très réactif.',
      date: new Date('2026-01-15'),
    },
    {
      _id: '4', idProduit: '1', idUser: 'u4', nomUser: 'Karim B.',
      avatarSeed: 'karim', note: 3, likes: 1, userLiked: false,
      commentaire: 'Correct mais pas exceptionnel. La photo est un peu trompeuse par rapport à la réalité.',
      date: new Date('2025-12-20'),
    },
  ]);

  // ── Formulaire avis ──
  reviewForm = this.fb.group({
    note: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    commentaire: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    nomUser: ['', [Validators.required, Validators.minLength(2)]],
  });

  prevImage() {
  this.selectedImageIndex.update(i => i - 1);
}

nextImage() {
  this.selectedImageIndex.update(i => i + 1);
}

  selectedRating = signal(0);

  // ── Computed ──
  moyenneNote = computed(() => {
    const list = this.avis();
    if (!list.length) return 0;
    return list.reduce((s, a) => s + a.note, 0) / list.length;
  });

  repartitionNotes = computed(() => {
    const list = this.avis();
    const total = list.length;
    return [5, 4, 3, 2, 1].map(note => ({
      note,
      count: list.filter(a => a.note === note).length,
      percent: total ? (list.filter(a => a.note === note).length / total) * 100 : 0,
    }));
  });

  // Images du produit (simule plusieurs images)
  productImages = computed(() => {
    const p = this.produit();
    if (!p) return [];
    const mainImg = p.image
      ? (p.image.startsWith('http') ? p.image : this.backendLink + '/' + p.image)
      : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80';
    return [
      mainImg,
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=60',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=60',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=60',
    ];
  });

  constructor() {
    effect(() => {
    const panier = this.panierService.panier();
      if (!panier) return;
      this.panier.set(panier);
    })
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    } else {
        this.produit.set(await this.produitService.getProduitById(id));
        const notes = await this.noteService.getNotesByProduitId(id);
        console.log('Notes', notes);
        
        this.initAvis(notes);
    }

  }

  initAvis(notes: Note[] = []) {
    if (notes.length === 0) {
        this.avis.set([]);
        return;
    }
    this.avis.set(notes.map((n: Note) => ({
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
        })));
  }

  // ── Helpers ──
  getStars(note: number, size: 'sm' | 'md' | 'lg' = 'md'): { filled: boolean }[] {
    return Array.from({ length: 5 }, (_, i) => ({ filled: i < Math.round(note) }));
  }

  starClass(size: 'sm' | 'md' | 'lg') {
    return size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  }

  setRating(note: number) {
    this.selectedRating.set(note);
    this.reviewForm.get('note')?.setValue(note);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date));
  }

  toggleLike(avisId: string) {
    this.avis.update(list =>
      list.map(a => {
        if (a._id !== avisId) return a;
        return { ...a, likes: a.userLiked ? a.likes - 1 : a.likes + 1, userLiked: !a.userLiked };
      })
    );
  }

  charCount = computed(() => (this.reviewForm.get('commentaire')?.value ?? '').length);

  hasError(field: string, error = '') {
    const ctrl = this.reviewForm.get(field);
    if (!ctrl?.touched || !ctrl?.invalid) return false;
    return error ? ctrl.hasError(error) : ctrl.invalid;
  }

  async submitReview() {
    this.reviewForm.markAllAsTouched();
    if (this.reviewForm.invalid) return;
    this.isSubmitting.set(true);
    await new Promise(r => setTimeout(r, 900));
    const v = this.reviewForm.value;
    const newAvis: Avis = {
      _id: Date.now().toString(),
      idProduit: this.produit()?._id ?? '',
      idUser: 'me',
      nomUser: v.nomUser ?? 'Anonyme',
      avatarSeed: v.nomUser ?? 'user',
      note: v.note ?? 0,
      commentaire: v.commentaire ?? '',
      date: new Date(),
      likes: 0,
      userLiked: false,
    };
    // this.avis.update(list => [newAvis, ...list]);
    this.submitSuccess.set(true);
    await this.noteService.ajouterNote(this.produit()?._id ?? '', v.note ?? 0, v.commentaire ?? '');
    
    this.initAvis(await this.noteService.getNotesByProduitId(this.produit()?._id ?? ''));

    this.reviewForm.reset();
    this.selectedRating.set(0);
    this.isSubmitting.set(false);
    setTimeout(() => this.submitSuccess.set(false), 3000);
  }

  async addToCart() {
      let quantite = 1;
    let idUser = this.authService.currentUserSubject.value?._id || '';
      // Appel à ton service pour ajouter le produit au panier
      await this.panierService.addToPanier(idUser, this.produit()?._id ?? '', quantite);
      let panier = await this.panierService.reloadPanier(); // Recharge le panier pour obtenir les dernières données
      this.panier.set(panier);
      // await this.panierService.addToPanier(...)
      this.inPanier.set(true);
  }

  verifInPanier(id: string): boolean {
    // return this.panier().includes(id);
    if (!this.panier()) return false;
    // console.log(this.panier());

    return this.panier().details.some((detail: PanierDetail) => detail.idProduit === id);
  }

  formatPrice(p: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(p);
  }
}