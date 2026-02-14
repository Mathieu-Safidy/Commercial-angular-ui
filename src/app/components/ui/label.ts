// label.component.ts
import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-label',
  imports: [
    NgClass
  ],
  template: `
    <label [ngClass]="getClasses()" [attr.for]="forAttr">
      <ng-content></ng-content>
    </label>
  `
})
export class LabelComponent {
  /** Classes supplémentaires passées depuis le template */
  @Input() className = '';

  /** Equivalent de htmlFor / for en React */
  @Input('for') forAttr?: string;

  /** Retourne les classes cva + classes personnalisées */
  getClasses(): string[] {
    return [
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      this.className
    ];
  }
}
