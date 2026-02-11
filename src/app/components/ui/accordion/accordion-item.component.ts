import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-accordion-item',
  template: `<ng-content></ng-content>`
})
export class AccordionItemComponent {
  @HostBinding('class')
  className = 'border-b';
}
