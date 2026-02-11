import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-popover',
  template: `
    <div class="relative inline-block">
      <!-- Trigger -->
      <button
        type="button"
        (click)="toggle()"
        class="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        <ng-content select="[popover-trigger]"></ng-content>
      </button>

      <!-- Content -->
      <div
        *ngIf="isOpen"
        [ngClass]="{
          'origin-top-center': align === 'center',
          'origin-top-left': align === 'start',
          'origin-top-right': align === 'end'
        }"
        [style.marginTop.px]="sideOffset"
        class="absolute z-50 w-72 rounded-md border bg-white p-4 text-gray-900 shadow-md transition-transform duration-200"
      >
        <ng-content select="[popover-content]"></ng-content>
      </div>
    </div>
  `,
  imports: [
    NgClass
  ],
  styles: [`
    .origin-top-left {
      transform-origin: top left;
    }

    .origin-top-center {
      transform-origin: top center;
    }

    .origin-top-right {
      transform-origin: top right;
    }
  `]
})
export class PopoverComponent {
  @Input() align: 'start' | 'center' | 'end' = 'center';
  @Input() sideOffset: number = 4;

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
