import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LucideAngularModule,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  AlertCircle,
} from 'lucide-angular';
import { CardComponent } from '../../../components/ui/card';
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { InputComponent } from '../../../components/ui/input';
import { ProduitService } from '../../../services/produitService/produit-service';
import { AlertDialogComponent } from '../../../components/ui/alert-dialog/alert-dialog.component';
import { AlertDialogTriggerComponent } from '../../../components/ui/alert-dialog/alert-dialog-trigger.component';
import { AlertDialogContentComponent } from '../../../components/ui/alert-dialog/alert-dialog-content.component';
import { AlertDialogCancelComponent } from '../../../components/ui/alert-dialog/alert-dialog-cancel.component';
import { AlertDialogService } from '../../../components/ui/alert-dialog/alert-dialog.service';
import { ProductDetailDialogComponent } from '../../../components/ui/produitDialogue/produitDalogue';
import { CreationDialogueComponent } from '../../../components/ui/produitDialogue/creationProduit';
import { MatDialog } from '@angular/material/dialog';
import { Environments } from '../../../environements/environments';

@Component({
  selector: 'app-boutique-products',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    InputComponent,
    LucideAngularModule,
    CardComponent,
    AlertDialogComponent,
    AlertDialogTriggerComponent,
    AlertDialogContentComponent,
    AlertDialogCancelComponent,
    ProductDetailDialogComponent,
  ],
  templateUrl: './BoutiqueProducts.html',
})
export class BoutiqueProductsComponent {
  produitService = inject(ProduitService);

  readonly Plus = Plus;
  readonly Search = Search;
  readonly Filter = Filter;
  readonly MoreVertical = MoreVertical;
  readonly Eye = Eye;
  readonly Edit3 = Edit3;
  readonly Trash2 = Trash2;
  readonly AlertCircle = AlertCircle;

  backendLink = Environments.BACKEND;

  //  _id: string;
  //   nom: string;
  //   description: string;
  //   idBoutique: string;
  //   idCategorie: string;
  //   prixInitial: number;
  //   consultationCount: number;
  //   modifiedAt: Date | null;
  //   createdAt: Date;
  //   deletedAt: Date | null;
  //   quantiteDisponible: number;
  //   boutique: Boutique;

  products = signal<Produit[]>([
    {
      _id: '699075f6489c38b47f628ca1',
      nom: 'Montre Minimaliste',
      description: '',
      idBoutique: '',
      idCategorie: '',
      prixInitial: 129,
      consultationCount: 0,
      modifiedAt: null,
      createdAt: new Date(),
      deletedAt: null,
      quantiteDisponible: 12,
      status: 'En stock',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
      boutique: {} as any,
    },
    {
      _id: '699075f6489c38b47f628ca2',
      nom: 'Vase Céramique',
      description: '',
      idBoutique: '',
      idCategorie: '',
      prixInitial: 45,
      consultationCount: 0,
      modifiedAt: null,
      createdAt: new Date(),
      deletedAt: null,
      quantiteDisponible: 5,
      status: 'Stock faible',
      image:
        'https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&q=80&w=400',
      boutique: {} as any,
    },
    {
      _id: '699075f6489c38b47f628ca3',
      nom: 'Casque ANC',
      description: '',
      idBoutique: '',
      idCategorie: '',
      prixInitial: 299,
      consultationCount: 0,
      modifiedAt: null,
      createdAt: new Date(),
      deletedAt: null,
      quantiteDisponible: 0,
      status: 'Rupture',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
      boutique: {} as any,
    },
    {
      _id: '699075f6489c38b47f628ca4',
      nom: 'Sac à dos Urbain',
      description: '',
      idBoutique: '',
      idCategorie: '',
      prixInitial: 85,
      consultationCount: 0,
      modifiedAt: null,
      createdAt: new Date(),
      deletedAt: null,
      quantiteDisponible: 24,
      status: 'En stock',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400',
      boutique: {} as any,
    },
  ]);
  dialog = inject(AlertDialogService);
  dialogueCreation = inject(MatDialog);
  totalStock = signal(0);
  stockFaibleCount = signal(0);
  ruptureCount = signal(0);
  constructor() {
    effect(() => {
      const prods = this.produitService.produits();
      this.totalStock.set(this.calculeStockTotal());
      this.stockFaibleCount.set(this.calculerStockFaible(1, 5));
      this.ruptureCount.set(this.calculerStockFaible(0, 0));
      this.products.set(prods);
      this.checkStatus();
      const prod = this.produitService.produitSelectionne();
      if (prod) {
        this.dialog.show(); // ← on utilise le service !
      } else {
        this.produitService.produitSelectionne.set(null);
        this.dialog.close();
      }
    });
  }

  calculeStockTotal() {
    return this.products().reduce((total, produit) => total + produit.quantiteDisponible, 0);
  }
  checkStatus() {
    const prods = this.products();
    prods.forEach((p) => {
      if (p.quantiteDisponible === 0) {
        p.status = 'Rupture';
      } else if (p.quantiteDisponible <= 5) {
        p.status = 'Stock faible';
      } else {
        p.status = 'En stock';
      }
    });
    this.products.set(prods);
  }
  modifierProduit(produit: Produit) {
    // this.produitService.produitSelectionne.set(produit);
    let dialogRef = this.dialogueCreation.open(CreationDialogueComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: produit,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const formData = new FormData();
      formData.append('nom', result.nom);
      formData.append('description', result.description);
      formData.append('prixInitial', result.prixInitial);
      formData.append('idCategorie', result.idCategorie);
      formData.append('idBoutique', '698dff42709de29d54628ca3');
      if (result.imageFile) {
        formData.append('image', result.imageFile); // upload fichier
      }

      this.produitService.modifierProduit(produit._id, formData).then(() => {
        this.produitService.reloadProduits();
      });
    });
  }

  ajouterProduit() {
    const dialogRef = this.dialogueCreation.open(CreationDialogueComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: null,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const formData = new FormData();
      formData.append('nom', result.nom);
      formData.append('description', result.description);
      formData.append('prixInitial', result.prixInitial);
      formData.append('idCategorie', result.idCategorie);
      formData.append('idBoutique', '698dff42709de29d54628ca3');
      if (result.imageFile) {
        formData.append('image', result.imageFile); // upload fichier
      }

      this.produitService.ajouterProduit(formData).then(() => {
        this.produitService.reloadProduits();
      });
      // const produit : Produit = {
      //   nom: result.nom,
      //   description: result.description,
      //   prixInitial: result.prixInitial,
      //   idCategorie: result.idCategorie,
      //   idBoutique: result.idBoutique,
      //   quantiteDisponible: result.quantiteDisponible,
      //   image: '', // L'URL de l'image sera définie par le backend après l'upload
      //   boutique: {} as any,
      //   _id: '',
      //   consultationCount: 0,
      //   modifiedAt: null,
      //   createdAt: new Date(),
      //   deletedAt: null,

      // }
    });
  }

  calculerStockFaible(min: number = 5, max: number = Infinity) {
    return this.products().filter((p) => p.quantiteDisponible >= min && p.quantiteDisponible <= max)
      .length;
  }
  openProductDetail(product: Produit) {
    this.produitService.produitSelectionne.set(product);
    this.dialog.show();
  }
}
