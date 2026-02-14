import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'ui-accordion-content',
  animations: [
    trigger('accordion', [
      state('closed', style({ height: '0', opacity: 0 })),
      state('open', style({ height: '*', opacity: 1 })),
      transition('closed <=> open', animate('200ms ease-in-out'))
    ])
  ],
  template: `
    <div
      [@accordion]="open ? 'open' : 'closed'"
      class="overflow-hidden text-sm"
    >
      <div class="pb-4 pt-0">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AccordionContentComponent {
  @Input() open = false;
}
