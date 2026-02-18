// product-detail-dialog.component.ts
import { Component, Input, computed, effect, inject, signal } from '@angular/core';
import { AlertDialogService } from '../alert-dialog/alert-dialog.service'; // ton service
import { CurrencyPipe, NgIf, NgClass, DatePipe } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component";
import { AlertDialogContentComponent } from "../alert-dialog/alert-dialog-content.component";
import { BadgeComponent } from "../badge"; // si tu utilises lucide
import { ProduitService } from '../../../services/produitService/produit-service';

@Component({
  selector: 'app-product-detail-dialog',
  standalone: true,
  imports: [NgIf, NgClass, CurrencyPipe, DatePipe, LucideAngularModule, AlertDialogContentComponent, BadgeComponent, AlertDialogComponent],
  template: `
    <ui-alert-dialog>
      <!-- Pas de trigger ici → on ouvre programmatiquement -->
      <ui-alert-dialog-content class="bg-background rounded-2xl p-0 w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">

        <!-- Header avec image en hero -->
        <div class="relative">
          <img
            [src]="product()?.image || defaultPlaceholder"
            [alt]="product()?.nom"
            class="w-full h-48 sm:h-64 object-cover rounded-t-2xl"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div class="absolute bottom-4 left-6 right-6 text-white">
            <h2 class="text-2xl font-bold drop-shadow-md">{{ product()?.nom }}</h2>
            <!-- <p class="text-sm opacity-90 mt-1">SKU : {{ product()?.sku || '—' }}</p> -->
          </div>

          <button 
            (click)="close()"
            class="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
          >
            <lucide-icon [img]="X" class="w-5 h-5"></lucide-icon>
          </button>
        </div>

        <!-- Contenu scrollable -->
        <div class="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p class="text-xs text-muted-foreground uppercase font-semibold">Statut</p>
              <app-badge
                [variant]="getStatusVariant(product()?.status)"
                class="mt-1.5 text-base px-4 py-1.5"
              >
                {{ product()?.status || 'Inconnu' }}
              </app-badge>
            </div>

            <div>
              <p class="text-xs text-muted-foreground uppercase font-semibold">Stock</p>
              <p class="text-xl font-bold mt-1"
                 [ngClass]="{
                   'text-emerald-600': product()?.status === 'En stock',
                   'text-amber-600':   product()?.status === 'Stock faible',
                   'text-red-600':     product()?.status === 'Rupture'
                 }">
                {{ product()?.quantiteDisponible || 0 }} <span class="text-base font-normal">unités</span>
              </p>
              <!-- <p *ngIf="product()?.seuilMinimum" class="text-xs text-muted-foreground mt-0.5">
                Seuil : {{ product().seuilMinimum }}
              </p> -->
            </div>

            <div>
              <p class="text-xs text-muted-foreground uppercase font-semibold">Prix TTC</p>
              <p class="text-xl font-black text-primary mt-1">
                {{ product()?.prixInitial | currency:'EUR':'symbol':'1.2-2' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground uppercase font-semibold">Catégorie</p>
              <p class="text-lg font-medium mt-1">{{ product()?.categorie || '—' }}</p>
            </div>
          </div>

          <!-- Description -->
          <div>
            <h3 class="text-lg font-semibold mb-2">Description</h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ product()?.description || 'Aucune description disponible pour ce produit.' }}
            </p>
          </div>

          <!-- Autres infos (fournisseur, date création, etc.) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6">
            <div>
              <h4 class="font-medium mb-2">Informations complémentaires</h4>
              <dl class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <dt class="text-muted-foreground">Fournisseur</dt>
                  <!-- <dd>{{ product()?.fournisseur || '—' }}</dd> -->
                </div>
                <div class="flex justify-between">
                  <dt class="text-muted-foreground">Référence interne</dt>
                  <dd class="font-mono">{{ product()?._id }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-muted-foreground">Créé le</dt>
                  <dd>{{ product()?.createdAt | date:'dd MMM yyyy' }}</dd>
                </div>
              </dl>
            </div>

            <!-- Actions rapides -->
            <div class="flex flex-col justify-end gap-3">
              <button app-button class="justify-center h-11 rounded-xl">
                Modifier le produit
              </button>
              <button app-button variant="outline" class="justify-center h-11 rounded-xl">
                Dupliquer
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t px-6 sm:px-8 py-5 bg-muted/40 flex justify-end gap-3">
          <button 
            app-button 
            variant="outline" 
            class="rounded-xl h-11 px-6"
            (click)="close()"
          >
            Fermer
          </button>
          <button 
            app-button 
            class="rounded-xl h-11 px-6 shadow-md"
            (click)="editProduct()"
          >
            Éditer
          </button>
        </div>

      </ui-alert-dialog-content>
    </ui-alert-dialog>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProductDetailDialogComponent {
//   @Input() product: any = null;
  productService = inject(ProduitService);
  product = computed(() => this.productService.prduitSelectionne());
  constructor() {
    // effect(() => {
    //     this.product.set(this.productService.prduitSelectionne());
    // })
  }
  X = X;
  dialog = inject(AlertDialogService);
  defaultPlaceholder = 'https://images.unsplash.com/photo-...400';

  close() {
    this.dialog.close();
  }

  editProduct() {
    // Logique d'édition (ouvre un autre modal ou navigue)
    console.log('Éditer produit', this.product());
    this.close();
  }

  getStatusVariant(status?: string) : "outline" | "default" | "secondary" | "destructive" {
    if (!status) return 'outline';
    if (status === 'En stock')     return 'default';
    if (status === 'Stock faible') return 'secondary';
    if (status === 'Rupture')      return 'destructive';
    return 'secondary';
  }
}