import { Component } from '@angular/core';
import { AlertDialogService } from './alert-dialog.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-alert-dialog-overlay',
  imports: [NgIf],
  template: `
    <div
      *ngIf="dialog.open"
      class="fixed inset-0 z-50 bg-black/80"
      (click)="dialog.close()"
    ></div>
  `
})
export class AlertDialogOverlayComponent {
  constructor(public dialog: AlertDialogService) {}
}
