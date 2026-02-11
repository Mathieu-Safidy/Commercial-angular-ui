import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

// Utilitaire cn comme en React
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

@Component({
  selector: 'app-spinner',
  template: `
    <svg
      role="status"
      aria-label="Loading"
      [ngClass]="spinnerClass"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      [attr.width]="size"
      [attr.height]="size"
      [attr.stroke]="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="animate-spin"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  `,
  imports: [
    NgClass
  ]
})
export class SpinnerComponent {
  /** Tailwind ou classes personnalisées */
  @Input() className?: string;

  /** Couleur du spinner */
  @Input() color: string = 'currentColor';

  /** Taille du spinner (taille en pixels) */
  @Input() size: number = 16;

  get spinnerClass() {
    return cn('size-4 animate-spin', this.className);
  }
}
