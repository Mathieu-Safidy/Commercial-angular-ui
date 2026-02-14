import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-alert-dialog-title',
  template: `<ng-content></ng-content>`
})
export class AlertDialogTitleComponent {
  @HostBinding('class')
  className = 'text-lg font-semibold';
}
