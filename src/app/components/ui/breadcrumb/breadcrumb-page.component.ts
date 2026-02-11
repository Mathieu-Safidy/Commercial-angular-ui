import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-page',
  template: `<ng-content></ng-content>`
})
export class BreadcrumbPageComponent {

  @HostBinding('attr.role')
  role = 'link';

  @HostBinding('attr.aria-disabled')
  disabled = 'true';

  @HostBinding('attr.aria-current')
  current = 'page';

  @HostBinding('class')
  className = 'font-normal text-foreground';
}
