import { NgModule } from '@angular/core';
import {
  LucideAngularModule,
  ArrowUpRight,
  TrendingUp,
  Eye,
  ShoppingCart,
  MessageSquare,
  LayoutDashboard,
  Package,
  Tag,
  Image,
  ChartColumn,
  Settings,
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      ArrowUpRight,
      TrendingUp,
      Eye,
      ShoppingCart,
      MessageSquare,
      LayoutDashboard,
      Package,
      Tag,
      Image,
      ChartColumn,
      Settings
    }),
  ],
  exports: [LucideAngularModule],
})
export class IconsModule {}
