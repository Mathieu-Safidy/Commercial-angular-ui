import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

// Utilitaire cn pour concaténer les classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

@Component({
  selector: 'app-textarea',
  template: `
    <textarea
      [ngClass]="cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )"
      [attr.disabled]="disabled ? '' : null"
      [attr.placeholder]="placeholder"
      [attr.rows]="rows"
      [attr.cols]="cols"
      [attr.name]="name"
      [attr.id]="id"
    ></textarea>
  `,
  imports: [
    NgClass
  ]
})
export class TextareaComponent {
  @Input() className?: string;
  @Input() disabled?: boolean;
  @Input() placeholder?: string;
  @Input() rows?: number;
  @Input() cols?: number;
  @Input() name?: string;
  @Input() id?: string;

  cn = cn;
}
