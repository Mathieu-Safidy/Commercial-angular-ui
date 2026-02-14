import { Component, Input, HostBinding, ElementRef, Renderer2, HostListener } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-select',
  template: `
    <div class="relative w-full">
      <button
        class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
        (click)="toggle()"
        [disabled]="disabled"
      >
        <span class="line-clamp-1">{{ value || placeholder }}</span>
        <svg class="h-4 w-4 opacity-50" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      </button>

      <div
        *ngIf="open"
        class="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md max-h-60 overflow-auto"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  imports: [
    NgIf
  ],
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SelectComponent {
  @Input() value: string | null = null;
  @Input() placeholder = 'Select...';
  @Input() disabled = false;
  open = false;

  toggle() {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  close() {
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  constructor(private el: ElementRef) {}
}

@Component({
  selector: 'app-select-item',
  imports: [
    NgIf
  ],
  template: `
    <div
      class="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm hover:bg-accent hover:text-accent-foreground"
      (click)="select()"
    >
      <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <svg *ngIf="selected" class="h-4 w-4" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      </span>
      <ng-content></ng-content>
    </div>
  `
})
export class SelectItemComponent {
  @Input() value: string | null = null;
  selected = false;

  constructor(private parent: SelectComponent) {}

  select() {
    if (this.value !== null) {
      this.parent.value = this.value;
      this.selected = true;
      this.parent.close();
    }
  }
}

@Component({
  selector: 'app-select-label',
  template: `<div class="px-2 py-1.5 text-sm font-semibold"><ng-content></ng-content></div>`
})
export class SelectLabelComponent {}

@Component({
  selector: 'app-select-separator',
  template: `<div class="-mx-1 my-1 h-px bg-muted"></div>`
})
export class SelectSeparatorComponent {}
