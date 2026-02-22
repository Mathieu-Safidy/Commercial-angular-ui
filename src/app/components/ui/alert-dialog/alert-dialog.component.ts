import { Component } from '@angular/core';
import { AlertDialogService } from './alert-dialog.service';

@Component({
  selector: 'ui-alert-dialog',
  template: `<ng-content></ng-content>`,
  // providers: [AlertDialogService]
})
export class AlertDialogComponent {
  constructor(public dialog: AlertDialogService) {}
}
