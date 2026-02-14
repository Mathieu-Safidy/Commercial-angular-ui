import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-alert-title',
  standalone: true,
  template: `<h5 class="mb-1 font-medium leading-none tracking-tight"><ng-content></ng-content></h5>`,
})
export class AlertTitleComponent {}
