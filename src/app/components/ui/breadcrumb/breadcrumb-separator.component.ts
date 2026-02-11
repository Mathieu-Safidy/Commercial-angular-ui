import { Component, HostBinding, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-breadcrumb-separator',
  imports: [NgIf],
  template: `
    <ng-content></ng-content>
    <svg
      *ngIf="!hasCustom"
      viewBox="0 0 24 24"
      class="w-3.5 h-3.5"
    >
      <path
        d="M9 18l6-6-6-6"
        fill="none"
        stroke="currentColor"
      />
    </svg>
  `
})
export class BreadcrumbSeparatorComponent {

  @Input() hasCustom = false;

  @HostBinding('attr.role')
  role = 'presentation';

  @HostBinding('attr.aria-hidden')
  hidden = 'true';
}
