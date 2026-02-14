import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  template: `<ng-content></ng-content>`
})
export class BreadcrumbComponent {


  @HostBinding('attr.aria-label')
  ariaLabel = 'breadcrumb';


  @HostBinding('attr.role')
  role = 'navigation';
}
