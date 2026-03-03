import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DetailLocation } from '../../../model/detailLocationModel';
import { LocationDetail } from '../../../services/locationDetail/location-detail';
import {
  Building2, Search, MoreVertical, CheckCircle2,
  Plus, Box, FileText, Clock, Wrench
} from 'lucide-angular';
import { BadgeComponent } from '../../../components/ui/badge';
import { ButtonComponent } from '../../../components/ui/button';
import { Location } from '../../../services/location/location';
import { ConfirmModalService } from '../../../components/comfirmation/confirm-modal.service';

@Component({
  selector: 'app-boutique-management',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    BadgeComponent,
    ButtonComponent,
  ],
  templateUrl: './BoutiqueManagement.html'
})
export class BoutiqueManagementComponent {

  icons = { Building2, Search, MoreVertical, CheckCircle2, Plus, Box, FileText, Clock, Wrench };

  private detailLocationService = inject(LocationDetail);
  private locationService = inject(Location);
  private confirmModal = inject(ConfirmModalService);

  detailLocations = signal<DetailLocation[]>([]);
  isLoading = signal(true);

  // Filtres
  searchQuery = signal('');
  activeFilter = signal<string>('all');

  statusFilters = [
    { value: 'all', label: 'Tous' },
    { value: 'en attente', label: 'En attente' },
    { value: 'valide', label: 'Validés' },
    { value: 'annulee', label: 'Annulés' },
  ];

  // Computed filtré
  filteredLocations = computed(() => {
    let list = this.detailLocations();
    const q = this.searchQuery().toLowerCase().trim();

    if (q) {
      list = list.filter(d =>
        String(d.idBox?.numero ?? '').toLowerCase().includes(q) ||
        String(d.idLocation?.idUser?.username ?? '').toLowerCase().includes(q)
      );
    }

    if (this.activeFilter() !== 'all') {
      list = list.filter(d => d.status === this.activeFilter());
    }

    return list;
  });

  async ngOnInit() {
    await this.reloadData();
  }

  async reloadData() {
    this.isLoading.set(true);
    try {
      this.detailLocations.set(await this.detailLocationService.getAll() as any[]);
    } catch (err) {
      console.error('Erreur chargement locations', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  countByStatus(status: string): number {
    return this.detailLocations().filter(d => d.status === status).length;
  }

  confirmValider(detail: DetailLocation) {
    this.confirmModal.open({
      theme: 'success',
      title: 'Valider cette location ?',
      message: 'La location sera confirmée et le box assigné au locataire.',
      confirmLabel: 'Valider la location',
      details: [
        `Box N°${detail.idBox?.numero} — ${detail.idBox?.dimension}m²`,
        `Locataire : ${detail.idLocation?.idUser?.username}`,
        `Prix : ${detail.prixFinal} MGA`,
      ],
      onConfirm: async () => {
        await this.valideLocation(
          detail.idLocation.idUser._id,
          detail.idBox._id
        );
      },
    });
  }

  async valideLocation(idUser: string, idBox: string) {
    try {
      await this.locationService.validateLocationBox(idUser, idBox);
      await this.reloadData();
    } catch (err) {
      console.error('Erreur validation location', err);
    }
  }
}