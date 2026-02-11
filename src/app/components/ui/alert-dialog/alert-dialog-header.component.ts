import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-alert-dialog-header',
  template: `<ng-content></ng-content>`
})
export class AlertDialogHeaderComponent {
  @HostBinding('class')
  className = 'flex flex-col space-y-2 text-center sm:text-left';
}
