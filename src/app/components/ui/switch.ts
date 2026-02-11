import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgClass} from '@angular/common';

// Utilitaire cn pour concaténer les classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

@Component({
  selector: 'app-switch',
  template: `
    <label
      [ngClass]="rootClass"
      class="inline-flex cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <input
        type="checkbox"
        class="sr-only"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)"
      />
      <span
        [ngClass]="thumbClass"
        class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform"
      ></span>
    </label>
  `,
  imports: [
    NgClass
  ]
})
export class SwitchComponent {
  /** Valeur actuelle du switch */
  @Input() checked: boolean = false;

  /** Désactive le switch */
  @Input() disabled: boolean = false;

  /** Classes personnalisées pour le root */
  @Input() className?: string;

  /** Événement émis lors du changement */
  @Output() checkedChange = new EventEmitter<boolean>();

  get rootClass() {
    return cn(
      'peer h-5 w-9',
      this.checked ? 'bg-primary' : 'bg-input',
      this.className
    );
  }

  get thumbClass() {
    return cn(
      this.checked ? 'translate-x-4' : 'translate-x-0'
    );
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.checkedChange.emit(this.checked);
  }
}
