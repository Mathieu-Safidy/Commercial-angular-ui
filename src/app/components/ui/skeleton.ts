import { Component, Input, HostBinding } from '@angular/core';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

@Component({
  selector: 'app-skeleton',
  template: `<div [class]="computedClass"><ng-content></ng-content></div>`,
  styles: [`
    .animate-pulse {
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .rounded-md { border-radius: 0.375rem; }
    .bg-primary\\/10 { background-color: rgba(0, 120, 250, 0.1); } /* ajuste selon ta couleur */
  `]
})
export class SkeletonComponent {
  @Input() className?: string;

  get computedClass(): string {
    return cn('animate-pulse rounded-md bg-primary/10', this.className);
  }
}
