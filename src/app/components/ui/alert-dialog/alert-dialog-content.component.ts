import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { AlertDialogService } from './alert-dialog.service';
import { AlertDialogOverlayComponent } from './alert-dialog-overlay.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'ui-alert-dialog-content',
  imports: [AlertDialogOverlayComponent, NgIf, AsyncPipe],

  template: `
    <ui-alert-dialog-overlay></ui-alert-dialog-overlay>

    <div
  *ngIf="dialog.open()"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
>
  <div
    class="relative w-full max-h-[96vh] rounded-xl bg-background shadow-xl"
  >
    <ng-content></ng-content>
  </div>
</div>
  `,
})
export class AlertDialogContentComponent {
  public dialog = inject(AlertDialogService);
  // state = input(false);
  // onClose = output<void>();
  // constructor() {
  //   effect(() => {
  //     console.log("Dialog open state in content:", this.state());
  //   });
  // }
}
