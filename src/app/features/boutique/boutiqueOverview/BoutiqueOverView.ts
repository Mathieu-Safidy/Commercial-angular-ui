import { Component, computed, inject, signal } from '@angular/core';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../../../components/ui/card';
import { BadgeComponent } from '../../../components/ui/badge';
import { ButtonComponent } from '../../../components/ui/button';
import { SeparatorComponent } from '../../../components/ui/separator';
import { ProgressComponent } from '../../../components/ui/progress';
import { ArrowUpRight, TrendingUp, Eye, Heart , MessageSquareCode , ShoppingCart, MessageSquare, LucideAngularModule } from 'lucide-angular';
import {NgClass, NgForOf} from '@angular/common';
import { IconsModule } from '../../../module/IconsModule';
import { DetailBoutiqueService } from '../../../services/detailBoutiqueService/detail-boutique-service';
import { AuthServices } from '../../../services/authService/auth.services';
import { DetailBoutique } from '../../../model/detailBoutiqueModel';


interface Dashboard {
  chiffreAffaire: number;
  venteTotale: number;
  avisNote: number;
  totalConsultation: number;
}


@Component({
  selector: 'app-boutique-overview',
  standalone: true,
  imports: [
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ButtonComponent,
    SeparatorComponent,
    ProgressComponent,
    LucideAngularModule,
    NgForOf,
    NgClass,
    IconsModule, 
  ],
  templateUrl: './BoutiqueOverView.html'
})
export class BoutiqueOverviewComponent {

  readonly ArrowUpRight = ArrowUpRight;
  readonly Eye = Eye;
  readonly Heart = Heart ; 
  readonly MessageSquare = MessageSquare ; 
  dashboard = signal<Dashboard | null>(null);
  detailBoutiqueService = inject(DetailBoutiqueService) ; 
  authService = inject(AuthServices);
  user: User | any = this.authService.currentUserSubject.value || { } ;
  userId = this.user._id;
  idBoutique = "" ; 

  bars = [60, 45, 80, 50, 90, 70, 100, 85, 95, 65, 75, 80];

  audience = [
    { label: 'France', val: 85 },
    { label: 'Belgique', val: 10 },
    { label: 'Suisse', val: 5 },
  ];

  async ngOnInit() { ; 
    await this.loadDetailBoutique() ;
    this.getDashboard() ;

  }
  async loadDetailBoutique() {
        try {
          const res = await this.detailBoutiqueService.getDetailBoutiqueByUserId(this.userId) as DetailBoutique;
          this.idBoutique = res.idBoutique._id ; 
        }catch (err) {
          console.error('Erreur lors du chargement :', err);
        }
  }
  async getDashboard() {
    const data = await this.detailBoutiqueService.getDashboard(this.idBoutique) as Dashboard;
    console.log(data);
    this.dashboard.set(data);
  }

stats = computed(() => {
  const data = this.dashboard();

  return [
    { 
      label: "Chiffre d'affaires",
      value: data?.chiffreAffaire ?? 0,
      trend: '',
      icon: 'TrendingUp',
      color: 'text-emerald-500',
      trendColor: 'text-emerald-500 bg-emerald-500/10'
    },
    { 
      label: 'Visites uniques',
      value: data?.totalConsultation ?? 0,
      trend: '',
      icon: 'Eye',
      color: 'text-blue-500',
      trendColor: 'text-blue-500 bg-blue-500/10'
    },
    { 
      label: 'Ventes totales',
      value: data?.venteTotale ?? 0,
      trend: '',
      icon: 'ShoppingCart',
      color: 'text-amber-500',
      trendColor: 'text-amber-500 bg-amber-500/10'
    },
    { 
      label: 'Avis Clients',
      value: data?.avisNote ?? 0,
      trend: '',
      icon: 'MessageSquare',
      color: 'text-primary',
      trendColor: 'text-primary bg-primary/10'
    }
  ];
});
}
