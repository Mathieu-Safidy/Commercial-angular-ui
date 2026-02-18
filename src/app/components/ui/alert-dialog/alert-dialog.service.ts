import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root'  })
export class AlertDialogService {
  open = signal(false);

  show() {
    console.log("Console log show");
    
    this.open.set(true);
  }

  close() {
    this.open.set(false);
  }
}
