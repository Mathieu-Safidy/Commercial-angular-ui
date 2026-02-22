import { effect, inject, Injectable, signal } from '@angular/core';
import { ProduitService } from '../../../services/produitService/produit-service';
@Injectable({ providedIn: 'root'  })
export class AlertDialogService {
  open = signal(false);
  produiService = inject(ProduitService);
  constructor() {
    effect(() => {
      console.log("Dialog open state in service:", this.open());
    })
  }

  show = () => {
    console.log("Console log show");
    this.open.set(true);
  }

  close = () => {
    this.open.set(false);
    this.produiService.produitSelectionne.set(null); // Réinitialise le produit sélectionné lors de la fermeture du dialogue
  }
}
