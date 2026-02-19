// stock-approvisionnement.component.ts
import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface Produit {
  _id: string;
  nom: string;
  quantiteDisponible?: number;
}

interface StockForm {
  idProduit: string;
  quantite: number;
  prixAchat?: number;
  dateEntree?: string;
  commentaire?: string;
}

@Component({
  selector: 'app-stock-approvisionnement',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: "./ApproBoutique.html",
  styles: []
})
export class StockApprovisionnementComponent {
  private http = inject(HttpClient);

  produits = signal<Produit[]>([]);
  loadingProduits = signal(true);

  formData: StockForm = {
    idProduit: '',
    quantite: 0,
    prixAchat: undefined,
    dateEntree: undefined,
    commentaire: undefined
  };

  submitting = signal(false);
  message = signal<string | null>(null);
  messageType = signal<'success' | 'error' | 'loading' | null>(null);

  constructor() {
    this.chargerProduits();

    // Reset message après 6 secondes
    effect(() => {
      if (this.message()) {
        setTimeout(() => this.clearMessage(), 6000);
      }
    });
  }

  async chargerProduits() {
    try {
      this.loadingProduits.set(true);
      const produits = await lastValueFrom(
        this.http.get<Produit[]>('/api/produits?limit=200')
      );
      this.produits.set(produits);
    } catch (err) {
      console.error('Erreur chargement produits', err);
      this.showMessage('Impossible de charger la liste des produits', 'error');
    } finally {
      this.loadingProduits.set(false);
    }
  }

  async onSubmit() {
    if (!this.formData.idProduit || this.formData.quantite < 1) return;

    this.submitting.set(true);
    this.showMessage('Enregistrement en cours...', 'loading');

    try {
      await lastValueFrom(
        this.http.post('/api/stocks', this.formData)
      );

      this.showMessage(`+${this.formData.quantite} unités ajoutées avec succès !`, 'success');

      // Reset form
      this.formData = {
        idProduit: '',
        quantite: 0,
        prixAchat: undefined,
        dateEntree: undefined,
        commentaire: undefined
      };
    } catch (err: any) {
      const errorMsg = err.error?.message || 'Une erreur est survenue lors de l’approvisionnement';
      this.showMessage(errorMsg, 'error');
      console.error(err);
    } finally {
      this.submitting.set(false);
    }
  }

  private showMessage(text: string, type: 'success' | 'error' | 'loading') {
    this.message.set(text);
    this.messageType.set(type);
  }

  private clearMessage() {
    this.message.set(null);
    this.messageType.set(null);
  }
}