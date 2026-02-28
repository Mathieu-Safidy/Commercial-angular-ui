import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DetailLocation} from '../../../model/detailLocationModel';
import { LocationDetail } from '../../../services/locationDetail/location-detail' ;
import {
  Building2,
  Search,
  MoreVertical,
  CheckCircle2,
  Plus,
  Box,
  FileText,
  Clock,
  Wrench
} from 'lucide-angular';
import {BadgeComponent} from '../../../components/ui/badge';
import { ButtonComponent } from '../../../components/ui/button';
import {Location} from "../../../services/location/location";
import {DetailBoutique} from '../../../model/detailBoutiqueModel';

@Component({
  selector: 'app-boutique-management',
  imports: [
    CommonModule,
    LucideAngularModule,
    BadgeComponent,
    ButtonComponent,
  ],
  templateUrl: './BoutiqueManagement.html'
})
export class BoutiqueManagementComponent {

  icons = {
    Building2,
    Search,
    MoreVertical,
    CheckCircle2,
    Plus,
    Box,
    FileText,
    Clock,
    Wrench
  };
  detailLocations = signal<DetailLocation[]>([]) ;

  constructor(private detailLocationService: LocationDetail , private locationService: Location) {}


  async ngOnInit() {
    this.reloadData() ;
  }
  async reloadData() { 
    this.detailLocations.set( await this.detailLocationService.getAll() as any[] ) ;
  }
  async valideLocation(idUser : string , idBox: string) {
    try {
      await this.locationService.validateLocationBox(idUser , idBox) ;
      this.reloadData() ; 
    } catch (err) {
      console.error('Erreur lors de la récupération des détails location', err);
    }
  }

  avatars = [1, 2];

  factures = [
    { label: 'Eco Luxe', sub: 'Location Janvier', price: '450€', status: 'Payé' },
    { label: 'Maintenance', sub: 'Nettoyage Zone A', price: '120€', status: 'Payé' },
    { label: 'Urban Tech', sub: 'Location Janvier', price: '320€', status: 'Retard' }
  ];
}
