import { Injectable } from '@angular/core';

@Injectable()
export class AlertDialogService {
  open = false;

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }
}
