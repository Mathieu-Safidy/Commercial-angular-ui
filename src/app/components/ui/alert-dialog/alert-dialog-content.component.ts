import { Component } from '@angular/core';
import { AlertDialogService } from './alert-dialog.service';
import {AlertDialogOverlayComponent} from './alert-dialog-overlay.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-alert-dialog-content',
  imports: [
    AlertDialogOverlayComponent,
    NgIf
  ],

  template: `
    <ui-alert-dialog-overlay></ui-alert-dialog-overlay>

    <div
      *ngIf="dialog.open"
      class="fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg
             -translate-x-1/2 -translate-y-1/2 gap-4
             border bg-background p-6 shadow-lg sm:rounded-lg"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class AlertDialogContentComponent {
  constructor(public dialog: AlertDialogService) {}
}
