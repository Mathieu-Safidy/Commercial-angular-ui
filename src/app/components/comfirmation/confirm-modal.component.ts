import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, CheckCircle, Info, LogOut, Trash2, X, ShoppingBag } from 'lucide-angular';
import { ConfirmModalService, ConfirmModalTheme } from './confirm-modal.service';
import { ButtonComponent } from '../ui/button';


@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
  modal = inject(ConfirmModalService);

  readonly AlertTriangle = AlertTriangle;
  readonly CheckCircle = CheckCircle;
  readonly Info = Info;
  readonly LogOut = LogOut;
  readonly Trash2 = Trash2;
  readonly X = X;
  readonly ShoppingBag = ShoppingBag;

  themeConfig: Record<ConfirmModalTheme, {
    icon: any;
    iconBg: string;
    iconColor: string;
    confirmClass: string;
    accentColor: string;
  }> = {
    danger: {
      icon: Trash2,
      iconBg: 'bg-destructive/10',
      iconColor: 'text-destructive',
      confirmClass: 'bg-destructive hover:bg-destructive/90 text-white',
      accentColor: 'border-destructive/20',
    },
    success: {
      icon: ShoppingBag,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
      confirmClass: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      accentColor: 'border-emerald-500/20',
    },
    warning: {
      icon: AlertTriangle,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
      confirmClass: 'bg-amber-500 hover:bg-amber-600 text-white',
      accentColor: 'border-amber-500/20',
    },
    info: {
      icon: Info,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      confirmClass: 'bg-primary hover:bg-primary/90 text-primary-foreground',
      accentColor: 'border-primary/20',
    },
    logout: {
      icon: LogOut,
      iconBg: 'bg-foreground/10',
      iconColor: 'text-foreground',
      confirmClass: 'bg-foreground hover:bg-foreground/90 text-background',
      accentColor: 'border-border',
    },
  };

  get theme() {
    return this.themeConfig[this.modal.config()?.theme ?? 'info'];
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).id === 'modal-backdrop') {
      this.modal.cancel();
    }
  }
}