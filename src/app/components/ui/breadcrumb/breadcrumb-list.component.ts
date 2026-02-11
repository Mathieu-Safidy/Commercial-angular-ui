import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-list',
  template: `<ng-content></ng-content>`
})
export class BreadcrumbListComponent {

  @HostBinding('class')
  className =
    'flex flex-wrap items-center gap-1.5 break-words ' +
    'text-sm text-muted-foreground sm:gap-2.5';
}
