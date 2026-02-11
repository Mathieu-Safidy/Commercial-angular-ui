import { Component, Input, HostBinding, ElementRef, Renderer2, HostListener, ContentChild, TemplateRef } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-sheet',
  template: `
    <ng-content select="[sheet-trigger]"></ng-content>
    <div
      class="fixed inset-0 z-50 bg-black/80"
      *ngIf="open"
      (click)="close()"
    ></div>
    <div
      *ngIf="open"
      [ngClass]="sheetClasses"
      class="fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out"
    >
      <button
        class="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        (click)="close()"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24">
          <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span class="sr-only">Close</span>
      </button>

      <ng-content select="[sheet-header]"></ng-content>
      <ng-content></ng-content>
      <ng-content select="[sheet-footer]"></ng-content>
    </div>
  `,
  imports: [
    NgClass,
    NgIf
  ]
})
export class SheetComponent {
  @Input() side: 'top' | 'bottom' | 'left' | 'right' = 'right';
  open = false;

  constructor(private el: ElementRef) {}

  toggle() {
    this.open = !this.open;
  }

  close() {
    this.open = false;
  }

  get sheetClasses() {
    switch (this.side) {
      case 'top':
        return 'inset-x-0 top-0 border-b';
      case 'bottom':
        return 'inset-x-0 bottom-0 border-t';
      case 'left':
        return 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm';
      case 'right':
      default:
        return 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm';
    }
  }
}

@Component({
  selector: 'app-sheet-header',
  template: `<div class="flex flex-col space-y-2 text-center sm:text-left"><ng-content></ng-content></div>`,
})
export class SheetHeaderComponent {}

@Component({
  selector: 'app-sheet-footer',
  template: `<div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"><ng-content></ng-content></div>`,
})
export class SheetFooterComponent {}

@Component({
  selector: 'app-sheet-title',
  template: `<h2 class="text-lg font-semibold text-foreground"><ng-content></ng-content></h2>`,
})
export class SheetTitleComponent {}

@Component({
  selector: 'app-sheet-description',
  template: `<p class="text-sm text-muted-foreground"><ng-content></ng-content></p>`,
})
export class SheetDescriptionComponent {}
