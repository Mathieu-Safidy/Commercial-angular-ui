import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-alert-dialog-footer',
  template: `<ng-content></ng-content>`
})
export class AlertDialogFooterComponent {
  @HostBinding('class')
  className =
    'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2';
}
