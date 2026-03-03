import { Component, OnInit, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute ,Router } from '@angular/router';
import { DetailBoutiqueService } from '../../../services/detailBoutiqueService/detail-boutique-service';
import { DetailBoutique } from '../../../model/detailBoutiqueModel';
import { Environments } from '../../../environements/environments';


interface HoraireJour {
  jour: string;
  heures: string;
  ferme: boolean;
  isToday: boolean;
}

interface Boutique {
  nom: string;
  description: string;
  email: string;
  telephone: string;
  adresse: string;
  horaires: string;
  status: 'ouvert' | 'ferme';
  photo: string;
}

@Component({
  selector: 'app-boutique-info-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutiqueInfo.html',
  styleUrls: ['./boutiqueInfo.css'],
})
export class BoutiqueInfoModalComponent implements OnInit {

  isOpen = true;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private detailBoutqueService = inject(DetailBoutiqueService);
  detailBoutique = signal<DetailBoutique | null>(null);
  backendLink = Environments.BACKEND;

  boutique: Boutique = {
    nom: 'Maison Élise',
    description: 'Une boutique raffinée au cœur de la ville, spécialisée dans la mode féminine contemporaine et les accessoires de créateurs locaux. Chaque pièce est soigneusement sélectionnée pour vous offrir une expérience unique.',
    email: 'contact@maisonelise.com',
    telephone: '+1 (514) 555-0192',
    adresse: '342 Rue Saint-Denis, Montréal, QC H2X 1L5',
    horaires: 'Lun – Sam : 9h – 18h  |  Dim : 11h – 17h',
    status: 'ouvert',
    photo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80'
  };

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    } else {
      console.log('Boutique ID:', id);
        this.detailBoutique.set(await this.detailBoutqueService.getDetailBoutiqueById(id));
        console.log('Detail Boutique:', this.detailBoutique());
    }
  }



}