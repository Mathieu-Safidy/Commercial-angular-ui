import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-accordion-trigger',
  template: `
    <button
      (click)="toggle()"
      class="flex flex-1 items-center justify-between py-4 text-sm font-medium
             transition-all hover:underline text-left"
    >
      <ng-content></ng-content>

      <!-- Chevron -->
      <svg
        class="h-4 w-4 transition-transform duration-200"
        [class.rotate-180]="open"
        viewBox="0 0 24 24"
      >
        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor"/>
      </svg>
    </button>
  `
})
export class AccordionTriggerComponent {
  @Input() open = false;

  toggle() {
    this.open = !this.open;
  }
}
