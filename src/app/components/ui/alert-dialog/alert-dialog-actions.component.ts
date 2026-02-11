import { Component } from '@angular/core';
import { AlertDialogService } from './alert-dialog.service';

@Component({
  selector: 'ui-alert-dialog-action',
  template: `
    <button class="btn" (click)="dialog.close()">
      <ng-content></ng-content>
    </button>
  `
})
export class AlertDialogActionComponent {
  constructor(public dialog: AlertDialogService) {}
}
