import { Component, computed, effect, inject } from '@angular/core';
import { AlertDialogService } from './alert-dialog.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'ui-alert-dialog-overlay',
  imports: [NgIf, AsyncPipe],
  template: `
    <div
      *ngIf="state()"
      class="fixed inset-0 z-50 bg-black/80"
      (click)="dialog.close()"
    ></div>
  `,
})
export class AlertDialogOverlayComponent {
  public dialog = inject(AlertDialogService);
  state = computed(() => this.dialog.open());
  constructor() {
    // effect(() => {
    //   // this.dialog.open$.subscribe((value) => {
    //   //   console.log('Dialog réellement ouvert ?', value);
    //   // });
    //   console.log("Dialog open state in overlay:", this.dialog.open());
    // });
  }
  // constructor(public dialog: AlertDialogService) {}
}
