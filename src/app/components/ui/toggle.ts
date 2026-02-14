import { Component, Input, HostBinding } from '@angular/core';
import {NgClass} from '@angular/common';

// Fonction cn pour concaténer les classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Définition des variantes comme dans cva
const toggleVariantsConfig = {
  variant: {
    default: 'bg-transparent',
    outline:
      'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
  },
  size: {
    default: 'h-9 px-2 min-w-9',
    sm: 'h-8 px-1.5 min-w-8',
    lg: 'h-10 px-2.5 min-w-10',
  },
};

@Component({
  selector: 'app-toggle',
  template: `
    <button
      type="button"
      [attr.aria-pressed]="state"
      [ngClass]="classes"
      (click)="toggle()"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  imports: [
    NgClass
  ]
})
export class ToggleComponent {
  @Input() variant: 'default' | 'outline' = 'default';
  @Input() size: 'default' | 'sm' | 'lg' = 'default';
  @Input() className?: string;
  @Input() disabled?: boolean;

  // State on/off similaire à data-[state=on]
  @HostBinding('attr.data-state') state: 'on' | 'off' = 'off';

  get classes() {
    return cn(
      'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      toggleVariantsConfig.variant[this.variant],
      toggleVariantsConfig.size[this.size],
      this.className
    );
  }

  toggle() {
    if (this.disabled) return;
    this.state = this.state === 'on' ? 'off' : 'on';
  }
}
