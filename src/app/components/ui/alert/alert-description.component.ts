import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-alert-description',
  template: `<ng-content></ng-content>`
})
export class AlertDescriptionComponent {

  @HostBinding('class')
  className = 'text-sm [&_p]:leading-relaxed';
}
