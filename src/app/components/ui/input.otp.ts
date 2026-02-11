// otp-input.component.ts
import { Component, Input, Output, EventEmitter, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-input-otp',
  template: `
    <div class="flex items-center gap-2 has-[:disabled]:opacity-50">
      <ng-content></ng-content>
    </div>
  `,
})
export class InputOTPComponent {}

@Component({
  selector: 'app-input-otp-group',
  template: `<div class="flex items-center"><ng-content></ng-content></div>`
})
export class InputOTPGroupComponent {}

@Component({
  selector: 'app-input-otp-slot',
  imports: [
    NgClass,
    NgIf
  ],
  template: `
    <div
      #slot
      class="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
      [ngClass]="{'z-10 ring-1 ring-ring': isActive}"
    >
      {{ char }}
      <div *ngIf="hasFakeCaret" class="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div class="h-4 w-px animate-caret-blink bg-foreground duration-1000"></div>
      </div>
    </div>
  `
})
export class InputOTPSlotComponent {
  @Input() char: string = '';
  @Input() isActive: boolean = false;
  @Input() hasFakeCaret: boolean = false;
}

@Component({
  selector: 'app-input-otp-separator',
  template: `
    <div role="separator">
      <ng-content></ng-content>
    </div>
  `
})
export class InputOTPSeparatorComponent {}
