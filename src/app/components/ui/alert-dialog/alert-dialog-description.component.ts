import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-alert-dialog-description',
  template: `<ng-content></ng-content>`
})
export class AlertDialogDescriptionComponent {
  @HostBinding('class')
  className = 'text-sm text-muted-foreground';
}
