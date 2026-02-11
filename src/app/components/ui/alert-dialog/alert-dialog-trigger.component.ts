import { Component } from '@angular/core';
import { AlertDialogService } from './alert-dialog.service';

@Component({
  selector: 'ui-alert-dialog-trigger',
  template: `
    <span (click)="dialog.show()">
      <ng-content></ng-content>
    </span>
  `
})
export class AlertDialogTriggerComponent {
  constructor(public dialog: AlertDialogService) {}
}
