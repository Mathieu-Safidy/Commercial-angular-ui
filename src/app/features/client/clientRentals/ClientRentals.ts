import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  MapPin,
  Maximize2,
  Calendar,
  CheckCircle2,
  Info,
  ArrowRight
} from 'lucide-angular';


import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardFooterComponent } from '../../../components/ui/card';
import { SeparatorComponent } from '../../../components/ui/separator';
import {Box} from "../../../services/box/box";
import {DetailLocationInput, Location} from "../../../services/location/location";
import { DetailLocation} from '../../../model/detailLocationModel';
import { LocationDetail } from '../../../services/locationDetail/location-detail' ;
import {AuthServices} from '../../../services/authService/auth.services';
//import { BoxModel } from '../../../model/boxModel';
@Component({
  selector: 'app-client-rentals',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    //CardTitleComponent,
    CardFooterComponent,
    SeparatorComponent
  ],
  templateUrl: './ClientRentals.html'
})
export class ClientRentalsComponent {
  // Mapping des icônes pour le template
  readonly MapPin = MapPin;
  readonly Maximize2 = Maximize2;
  readonly Box = Box;
  readonly Calendar = Calendar;
  readonly CheckCircle2 = CheckCircle2;
  readonly Info = Info;
  readonly ArrowRight = ArrowRight;
  protected rentalSpaces = signal<any[]>([]); // Remplace 'any' par le type approprié de tes espaces de location
  detailLocations: DetailLocation[] = [];

  authService = inject(AuthServices);
  user: User | any = this.authService.currentUserSubject.value || { } ;
  userId = this.user._id;

  constructor(private boxService: Box , private locationService: Location, private detailLocationService: LocationDetail) {}

  async onRequestLocation(idBox: string, numero: string , prixFinal:string) {
    try {
      let note = `Location demandée ${numero}`;
      let details = this.transformBoxToDetail(idBox , prixFinal);

      const result = await this.locationService.createLocationWithDetails(note, this.userId, details);
      console.log('Location créée avec succès', result);

    } catch (err) {
      console.error('Erreur lors de la création de la location', err);
    }
  }
  private transformBoxToDetail(idBox:string , prixFinal : string): DetailLocationInput[] {
    return [ { idBox: idBox,  dateDebut: new Date().toISOString(), prixFinal: prixFinal}]
  }

  async ngOnInit() {
    const boxes = await this.boxService.getAll() as any [];
    console.log(boxes);
    this.detailLocations = await this.detailLocationService.getAll() as any[];

    this.rentalSpaces.set(
      boxes.map((box: { _id: any; numero: any; position: any; dimension: any; prixInitial: any; }) => {
      const detail = this.detailLocations.find(d =>
        d.idBox._id === box._id
      );
      let status = 'disponible';

      if (detail) {
        if (detail.status === 'valide') {
          status = 'valide';
        } else if (detail.status === 'en attente') {
          status = 'en attente';
        }
      }

      return {
        id: box._id,
        name: `Box N°${box.numero}`,
        location: `Étage ${box.position}`,
        size: `${box.dimension}m²`,
        price: `${box.prixInitial}MGA / mois`,
        priceFinal: box.prixInitial,
        status: status , //pas encore d'annulement
        features: ["Accès sécurisé", "Électricité incluse"],
        image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800"
      };
    }));


  }

}
