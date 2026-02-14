// input-group.component.ts
import { Component, Input, HostListener, ElementRef } from '@angular/core';
import {NgClass} from '@angular/common';

type Align = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
type ButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';

@Component({
  selector: 'app-input-group',
  template: `
    <div
      role="group"
      data-slot="input-group"
      [ngClass]="getGroupClasses()"
    >
      <ng-content select="[input-group-addon]"></ng-content>
      <ng-content select="[input-group-input]"></ng-content>
      <ng-content select="[input-group-text]"></ng-content>
      <ng-content select="[input-group-button]"></ng-content>
      <ng-content select="[input-group-textarea]"></ng-content>
    </div>
  `,
  imports: [
    NgClass
  ],
  styles: []
})
export class InputGroupComponent {
  @Input() className = '';

  getGroupClasses() {
    return [
      'group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]',
      'h-9',
      this.className
    ];
  }
}

@Component({
  selector: 'app-input-group-addon',
  template: `
    <div
      role="group"
      data-slot="input-group-addon"
      [attr.data-align]="align"
      [ngClass]="getAddonClasses()"
      (click)="focusInput($event)"
    >
      <ng-content></ng-content>
    </div>
  `,
  imports: [
    NgClass
  ]
})
export class InputGroupAddonComponent {
  @Input() align: Align = 'inline-start';
  @Input() className = '';

  constructor(private elRef: ElementRef) {}

  getAddonClasses() {
    const base = 'text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium';
    const alignClasses: Record<Align, string> = {
      'inline-start': 'order-first pl-3',
      'inline-end': 'order-last pr-3',
      'block-start': 'order-first w-full justify-start px-3 pt-3',
      'block-end': 'order-last w-full justify-start px-3 pb-3',
    };
    return [base, alignClasses[this.align] ?? '', this.className];
  }

  focusInput(event: Event) {
    const target = (event.currentTarget as HTMLElement).parentElement?.querySelector('input');
    target?.focus();
  }
}

@Component({
  selector: 'app-input-group-button',
  template: `
    <button [attr.type]="type" [ngClass]="getButtonClasses()">
      <ng-content></ng-content>
    </button>
  `,
  imports: [
    NgClass
  ]
})
export class InputGroupButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() size: ButtonSize = 'xs';
  @Input() className = '';

  getButtonClasses() {
    const base = 'flex items-center gap-2 text-sm shadow-none';
    const sizeClasses: Record<ButtonSize, string> = {
      xs: 'h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2',
      sm: 'h-8 gap-1.5 rounded-md px-2.5',
      'icon-xs': 'size-6 rounded-[calc(var(--radius)-5px)] p-0',
      'icon-sm': 'size-8 p-0',
    };
    return [base, sizeClasses[this.size] ?? '', this.className];
  }
}

@Component({
  selector: 'app-input-group-text',
  imports: [
    NgClass
  ],
  template: `<span [ngClass]="getTextClasses()"><ng-content></ng-content></span>`
})
export class InputGroupTextComponent {
  @Input() className = '';

  getTextClasses() {
    return ['text-muted-foreground flex items-center gap-2 text-sm', this.className];
  }
}

@Component({
  selector: 'app-input-group-input',
  imports: [
    NgClass
  ],
  template: `<input data-slot="input-group-control" [ngClass]="getInputClasses()"/>`
})
export class InputGroupInputComponent {
  @Input() className = '';

  getInputClasses() {
    return ['flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0', this.className];
  }
}

@Component({
  selector: 'app-input-group-textarea',
  imports: [
    NgClass
  ],
  template: `<textarea data-slot="input-group-control" [ngClass]="getTextareaClasses()"></textarea>`
})
export class InputGroupTextareaComponent {
  @Input() className = '';

  getTextareaClasses() {
    return ['flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0', this.className];
  }
}
