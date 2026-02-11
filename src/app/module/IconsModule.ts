import { NgModule } from '@angular/core';
import { LucideAngularModule, ArrowUpRight, TrendingUp, Eye, ShoppingCart, MessageSquare } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      ArrowUpRight,
      TrendingUp,
      Eye,
      ShoppingCart,
      MessageSquare
    })
  ],
  exports: [LucideAngularModule]
})
export class IconsModule {}
