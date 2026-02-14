import { Component, Input, Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';


function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

@Injectable({ providedIn: 'root' })
export class ToasterService {
  private _toasts = new BehaviorSubject<Toast[]>([]);
  toasts$ = this._toasts.asObservable();

  show(toast: Toast) {
    const current = this._toasts.getValue();
    this._toasts.next([...current, toast]);
    if (!toast.duration) toast.duration = 3000;
    setTimeout(() => this.dismiss(toast), toast.duration);
  }

  dismiss(toast: Toast) {
    const current = this._toasts.getValue();
    this._toasts.next(current.filter(t => t !== toast));
  }
}

export interface Toast {
  message: string | TemplateRef<any>;
  description?: string;
  duration?: number;
  actionLabel?: string;
  action?: () => void;
  cancelLabel?: string;
  cancel?: () => void;
}

// Composant Toaster
@Component({
  selector: 'app-toaster',
  template: `
    <div class="toaster fixed top-5 right-5 flex flex-col gap-2 z-50">
      <ng-container *ngFor="let toast of toasts">
        <div
          class="toast group bg-background text-foreground border border-border shadow-lg p-3 rounded-md flex flex-col gap-1"
        >
          <div class="flex justify-between items-center">
            <span class="font-medium">{{ toast.message }}</span>
            <button *ngIf="toast.cancelLabel" (click)="toast.cancel?.()"
                    class="bg-muted text-muted-foreground px-2 rounded">
              {{ toast.cancelLabel }}
            </button>
          </div>
          <p *ngIf="toast.description" class="text-muted-foreground">{{ toast.description }}</p>
          <div class="flex gap-2 mt-1">
            <button *ngIf="toast.actionLabel" (click)="toast.action?.()"
                    class="bg-primary text-primary-foreground px-2 rounded">
              {{ toast.actionLabel }}
            </button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  imports: [
    NgIf,
    NgForOf
  ],
  styles: [`
    .toaster {
      z-index: 10000;
    }

    .toast {
      transition: all 0.3s ease;
    }
  `]
})
export class ToasterComponent {
  toasts: Toast[] = [];

  constructor(private toasterService: ToasterService) {
    this.toasterService.toasts$.subscribe(t => this.toasts = t);
  }
}
