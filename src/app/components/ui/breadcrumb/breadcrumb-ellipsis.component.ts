import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb-ellipsis',
  template: `
    <span class="sr-only">More</span>

    <svg viewBox="0 0 24 24" class="h-4 w-4">
      <circle cx="5" cy="12" r="1.5"/>
      <circle cx="12" cy="12" r="1.5"/>
      <circle cx="19" cy="12" r="1.5"/>
    </svg>
  `
})
export class BreadcrumbEllipsisComponent {

  @HostBinding('attr.role')
  role = 'presentation';

  @HostBinding('attr.aria-hidden')
  hidden = 'true';

  @HostBinding('class')
  className = 'flex h-9 w-9 items-center justify-center';
}
