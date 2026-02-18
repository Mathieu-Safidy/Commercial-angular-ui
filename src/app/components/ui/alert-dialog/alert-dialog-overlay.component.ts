import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { AlertDialogService } from './alert-dialog.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'ui-alert-dialog-overlay',
  imports: [NgIf, AsyncPipe],
  template: `
    <div
      *ngIf="dialog.open()"
      class="fixed inset-0 z-50 bg-black/80"
      (click)="this.dialog.close()"
    ></div>
  `,
})
export class AlertDialogOverlayComponent {
  public dialog = inject(AlertDialogService);
  // state = computed(() => this.dialog.open());
  // state = input(false);
  // onClose = output<void>();
  // constructor() {
  //   effect(() => {
  //   //   // this.dialog.open$.subscribe((value) => {
  //   //   //   console.log('Dialog réellement ouvert ?', value);
  //   //   // });
  //     console.log("Dialog open state in overlay:", this.state());
  //     // this.state.set(this.dialog.open());
  //   });
  // }
  // // constructor(public dialog: AlertDialogService) {}
}
