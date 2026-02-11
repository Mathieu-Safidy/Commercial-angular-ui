import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-item',
  template: `<ng-content></ng-content>`
})
export class BreadcrumbItemComponent {

  @HostBinding('class')
  className = 'inline-flex items-center gap-1.5';
}
