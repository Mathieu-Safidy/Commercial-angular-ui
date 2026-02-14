import { Component } from '@angular/core';
import { AlertDialogService } from './alert-dialog.service';

@Component({
  selector: 'ui-alert-dialog-cancel',
  template: `
    <button
      class="btn-outline mt-2 sm:mt-0"
      (click)="dialog.close()"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class AlertDialogCancelComponent {
  constructor(public dialog: AlertDialogService) {}
}
