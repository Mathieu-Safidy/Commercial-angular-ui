// product-detail-dialog.component.ts
import { Component, Input, computed, effect, inject, signal } from '@angular/core';
import { AlertDialogService } from '../alert-dialog/alert-dialog.service'; // ton service
import { CurrencyPipe, NgIf, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { AlertDialogContentComponent } from '../alert-dialog/alert-dialog-content.component';
import { BadgeComponent } from '../badge'; // si tu utilises lucide
import { ProduitService } from '../../../services/produitService/produit-service';
import { ButtonComponent } from '../button';
import { StockService } from '../../../services/stockService/stock-service';

@Component({
  selector: 'app-product-detail-dialog',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    CurrencyPipe,
    DatePipe,
    FormsModule,
    ButtonComponent,
    LucideAngularModule,
    AlertDialogContentComponent,
    BadgeComponent,
    AlertDialogComponent,
  ],
  template: `
    <ui-alert-dialog>
      <ui-alert-dialog-content class="bg-transparent p-0 border-none shadow-none">
        <div
          *ngIf="dialog.open()"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
          (click)="close()"
        >
          <div
            class="
          relative w-full max-w-6xl h-[92vh] sm:h-[90vh] lg:h-[88vh]
          bg-background rounded-2xl lg:rounded-3xl
          shadow-2xl overflow-hidden flex flex-col lg:flex-row
        "
            (click)="$event.stopPropagation()"
          >
            <!-- Colonne GAUCHE → Image + titre mobile -->
            <div class="lg:w-2/5 lg:border-r border-border relative flex flex-col">
              <!-- Image principale -->
              <div class="relative flex-1 min-h-[220px] lg:min-h-0">
                <img
                  [src]="product()?.image || defaultPlaceholder"
                  [alt]="product()?.nom || 'Produit sans image'"
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <!-- Overlay gradient + titre (visible sur mobile, caché sur lg) -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent lg:hidden"
                ></div>
                <div class="absolute bottom-5 left-5 right-5 text-white lg:hidden">
                  <h2 class="text-2xl font-bold drop-shadow-lg">{{ product()?.nom }}</h2>
                </div>
              </div>

              <!-- Bouton fermer (mobile) -->
              <button
                (click)="close()"
                class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2.5 lg:hidden z-10 transition"
              >
                <lucide-icon [img]="X" class="w-5 h-5"></lucide-icon>
              </button>
            </div>

            <!-- Colonne DROITE → Détails -->
            <div class="flex-1 flex flex-col overflow-hidden">
              <!-- Header desktop (titre + bouton fermer) -->
              <div
                class="hidden lg:flex items-center justify-between px-7 pt-4 pb-2 border-b border-border"
              >
                <h2 class="text-2xl font-bold tracking-tight">{{ product()?.nom }}</h2>
                <button
                  (click)="close()"
                  class="text-muted-foreground hover:text-foreground rounded-full p-2 transition"
                >
                  <lucide-icon [img]="X" class="w-6 h-6"></lucide-icon>
                </button>
              </div>

              <!-- Contenu scrollable -->
              <div class="flex-1 overflow-y-auto px-6 sm:px-7 lg:px-8 py-6 lg:py-4 space-y-7">
                <!-- Badges & infos rapides -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  <div>
                    <p class="text-xs uppercase font-semibold text-muted-foreground tracking-wide">
                      Statut
                    </p>
                    <app-badge
                      [variant]="getStatusVariant(product()?.status)"
                      class="mt-2 text-base px-4 py-1.5 font-medium"
                    >
                      {{ product()?.status || '—' }}
                    </app-badge>
                  </div>

                  <div>
                    <p class="text-xs uppercase font-semibold text-muted-foreground tracking-wide">
                      Stock
                    </p>
                    <p
                      class="text-2xl font-bold mt-2"
                      [ngClass]="{
                        'text-emerald-600': product()?.status === 'En stock',
                        'text-amber-600': product()?.status === 'Stock faible',
                        'text-red-600': product()?.status === 'Rupture',
                      }"
                    >
                      {{ product()?.quantiteDisponible || 0 }}
                      <span class="text-lg font-normal text-muted-foreground"> unités</span>
                    </p>
                  </div>

                  <div>
                    <p class="text-xs uppercase font-semibold text-muted-foreground tracking-wide">
                      Prix TTC
                    </p>
                    <p class="text-2xl font-black text-primary mt-2">
                      {{ product()?.prixInitial | currency: 'MGA' : 'symbol-narrow' : '1.2-2' }}
                    </p>
                  </div>

                  <div>
                    <p class="text-xs uppercase font-semibold text-muted-foreground tracking-wide">
                      Catégorie
                    </p>
                    <p class="text-lg font-medium mt-2">{{ product()?.idCategorie?.nom || '—' }}</p>
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <h3 class="text-lg font-semibold mb-3">Description</h3>
                  <p class="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {{ product()?.description || 'Aucune description pour le moment.' }}
                  </p>
                </div>

                <!-- Infos complémentaires -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t">
                  <div>
                    <h4 class="font-semibold mb-3">Détails produit</h4>
                    <dl class="space-y-2.5 text-sm">
                      <div class="flex justify-between">
                        <dt class="text-muted-foreground">Référence</dt>
                        <dd class="font-mono">{{ product()?._id || '—' }}</dd>
                      </div>
                      <div class="flex justify-between">
                        <dt class="text-muted-foreground">Créé le</dt>
                        <dd>{{ (product()?.createdAt | date: 'dd MMM yyyy') ?? '—' }}</dd>
                      </div>
                      <!-- Ajoute d'autres champs si besoin -->
                    </dl>
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-col justify-end gap-3 sm:items-end">
                    <button app-button class="h-11 px-6 rounded-xl font-medium shadow-sm">
                      Modifier le produit
                    </button>
                    <button
                      app-button
                      [variant]="variantAppro()"
                      class="h-11 px-6 rounded-xl"
                      (click)="aproActif.set(!aproActif());quantityToAdd.set(0)"
                    >
                      {{(aproActif() ? ' Annuler' : 'Approvisionner' )}}
                    </button>
                  </div>
                </div>
                <!-- @if (aproActif()) {
                <div class="flex items-end w-full justify-end">
                  <div class="flex items-center mr-2 "><span class="font-semibold">Quantité à approvisionner : </span></div>
                  <div class="flex items-center bg-muted rounded-full px-2">
                    <button (click)="minusNumber()" app-button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-lg">-</button>
                    <span class="w-8 text-center font-bold text-sm">{{ product()?.quantiteDisponible }}</span>
                    <button (click)="addNumber()" app-button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-lg">+</button>
                  </div>
                </div>
              } -->

                @if (aproActif()) {
                  <div class="pt-6 border-t border-border">
                    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                      <!-- Label + feedback -->
                      <div class="space-y-1">
                        <label class="font-semibold text-lg"> Quantité à ajouter au stock </label>
                        <p class="text-sm text-muted-foreground">
                          Stock actuel :
                          <strong>{{ product()?.quantiteDisponible || 0 }}</strong> unités
                        </p>
                      </div>

                      <!-- Compteur + actions -->
                      <div class="flex items-center gap-3">
                        <div
                          class="flex items-center bg-muted rounded-full px-1.5 py-1 shadow-inner"
                        >
                          <button
                            type="button"
                            (click)="decrement()"
                            [disabled]="quantityToAdd() <= 0"
                            app-button
                            variant="ghost"
                            size="icon"
                            class="h-10 w-10 rounded-full text-xl hover:bg-background/80 disabled:opacity-40"
                          >
                            −
                          </button>

                          <input
                            type="number"
                            [ngModel]="quantityToAdd()"
                            (ngModelChange)="quantityToAdd.set($event)"
                            min="0"
                            class="w-20 text-center text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />

                          <button
                            type="button"
                            (click)="increment()"
                            app-button
                            variant="ghost"
                            size="icon"
                            class="h-10 w-10 rounded-full text-xl hover:bg-background/80"
                          >
                            +
                          </button>
                        </div>

                        <!-- Bouton Confirmer -->
                        <button
                          app-button
                          [variant]="quantityToAdd() > 0 ? 'default' : 'outline'"
                          [disabled]="quantityToAdd() <= 0"
                          class="h-11 px-6 rounded-xl font-medium min-w-[140px]"
                          (click)="confirmApprovisionnement()"
                        >
                          Confirmer +{{ quantityToAdd() }}
                        </button>
                      </div>
                    </div>

                    <!-- Feedback visuel quand quantité > 0 -->
                    @if (quantityToAdd() > 0) {
                      <p
                        class="mt-3 text-center sm:text-right text-sm font-medium text-green-600 dark:text-green-400"
                      >
                        → Ajout de <strong>{{ quantityToAdd() }}</strong> unité{{
                          quantityToAdd() > 1 ? 's' : ''
                        }}
                      </p>
                    }
                  </div>
                }
              </div>
              <!-- Footer mobile -->
              <div class="lg:hidden border-t px-6 py-5 bg-muted/40 flex justify-end gap-3">
                <button app-button variant="outline" class="h-11 px-6 rounded-xl" (click)="close()">
                  Fermer
                </button>
                <button app-button class="h-11 px-6 rounded-xl shadow-md" (click)="editProduct()">
                  Éditer
                </button>
              </div>
            </div>
          </div>
        </div>
      </ui-alert-dialog-content>
    </ui-alert-dialog>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ProductDetailDialogComponent {
  //   @Input() product: any = null;
  productService = inject(ProduitService);
  // product = computed(() => this.productService.produitSelectionne());
  product = signal<Produit | null>(null);
  state = signal(false);
  aproActif = signal(false);
  variantAppro = computed(() => (this.aproActif() ? 'destructive' : 'outline'));
  onClose() {
    this.productService.produitSelectionne.set(null);
  }
  constructor() {
    effect(() => {
      console.log(
        'Produit sélectionné dans le dialogue:',
        this.productService.produitSelectionne(),
      );
      this.product.set(this.productService.produitSelectionne());
      // if (this.productService.produitSelectionne()) {
      //   this.product.set(this.productService.produitSelectionne());
      //   this.state.set(true);
      // } else {
      //   this.product.set(null);
      //   this.state.set(false);
      // }
      // this.product.set(this.productService.produitSelectionne());
    });
  }
  X = X;
  dialog = inject(AlertDialogService);
  stockService = inject(StockService);
  produitService = inject(ProduitService);
  defaultPlaceholder =
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400';

  close() {
    this.dialog.close();
  }
  // Dans la classe ProductDetailDialogComponent

  quantityToAdd = signal(0);

  increment() {
    this.quantityToAdd.update((q) => q + 1);
  }

  decrement() {
    this.quantityToAdd.update((q) => Math.max(0, q - 1));
  }

  // Méthode la plus importante : valider l'approvisionnement
  async confirmApprovisionnement() {
    const qty = this.quantityToAdd();
    const prod = this.product();

    if (!prod || qty <= 0) return;

    // Option 1 : mise à jour locale + appel API
    const nouveauStock = prod.quantiteDisponible + qty;

    try {
      // Appel API (adapte selon ton service)
      await this.stockService.approvisionnerProduit(prod._id, qty);
      await this.produitService.reloadProduits( this.product()?.idBoutique!); // pour rafraîchir la liste et le produit sélectionné
      // await this.produitService
      //   .approvisionnerProduit(prod._id, {
      //     quantite: qty,
      //     // prixAchat?, dateEntree?, commentaire? si tu veux
      //   })
      //   .toPromise(); // ou lastValueFrom si tu utilises httpClient

      // Mise à jour locale après succès
      this.product.update((p) => (p ? { ...p, quantiteDisponible: nouveauStock } : null));

      // Reset
      this.quantityToAdd.set(0);

      // Optionnel : message de succès
      // this.dialog.showSuccess(`+${qty} unités ajoutées au stock !`);
    } catch (err) {
      console.error('Erreur approvisionnement', err);
      // this.dialog.showError('Échec de l\'approvisionnement');
    }
  }
  addNumber() {
    const prod = this.product();
    if (prod) {
      prod.quantiteDisponible += 1;
      this.product.set({ ...prod });
    }
  }

  minusNumber() {
    const prod = this.product();
    if (prod && prod.quantiteDisponible > 0) {
      prod.quantiteDisponible -= 1;
      this.product.set({ ...prod });
    }
  }

  editProduct() {
    // Logique d'édition (ouvre un autre modal ou navigue)
    console.log('Éditer produit', this.product());
    this.close();
  }

  getStatusVariant(status?: string): 'outline' | 'default' | 'secondary' | 'destructive' {
    if (!status) return 'outline';
    if (status === 'En stock') return 'default';
    if (status === 'Stock faible') return 'secondary';
    if (status === 'Rupture') return 'destructive';
    return 'secondary';
  }
}
