import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueDashboardComponent } from './boutiqueDashboard/BoutiqueDashBoard';
import { BoutiqueProductsComponent } from './boutiqueProducts/BoutiqueProducts';
import { BoutiqueOrdersComponent } from './boutiqueOrders/BoutiqueOrders';
import { BoutiqueStatsComponent } from './boutiqueStats/BoutiqueStats';
import {BoutiqueOverviewComponent} from './boutiqueOverview/BoutiqueOverView';

@NgModule({
  imports: [
    CommonModule,
    BoutiqueDashboardComponent,
    BoutiqueProductsComponent,
    BoutiqueOrdersComponent,
    BoutiqueStatsComponent,
    BoutiqueOverviewComponent
  ],
  exports: [
    BoutiqueDashboardComponent
  ]
})
export class BoutiqueModule {}
