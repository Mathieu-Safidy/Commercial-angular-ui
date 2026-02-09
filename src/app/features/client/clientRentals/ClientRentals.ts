import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  MapPin,
  Maximize2,
  Box,
  Calendar,
  CheckCircle2,
  Info,
  ArrowRight
} from 'lucide-angular';

// Imports de tes composants UI
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardFooterComponent } from '../../../components/ui/card';
import { SeparatorComponent } from '../../../components/ui/separator';

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
    CardTitleComponent,
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

  rentalSpaces = [
    {
      id: 1,
      name: "Box Premium A1",
      location: "Zone Nord - Étage 1",
      size: "15m²",
      price: "450€ / mois",
      status: "Disponible",
      features: ["Sécurisé 24/7", "Électricité incluse", "Proche ascenseur"],
      image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      name: "Boutique Éphémère B4",
      location: "Allée Centrale",
      size: "25m²",
      price: "850€ / mois",
      status: "Disponible",
      features: ["Vitrine panoramique", "WiFi fibre", "Stockage inclus"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      name: "Box Standard C12",
      location: "Zone Sud",
      size: "10m²",
      price: "250€ / mois",
      status: "Indisponible",
      features: ["Accès facile", "Nettoyage hebdomadaire"],
      image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&q=80&w=800"
    },
  ];
}
