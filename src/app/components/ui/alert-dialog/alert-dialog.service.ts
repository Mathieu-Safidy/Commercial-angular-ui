import { effect, Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root'  })
export class AlertDialogService {
  open = signal(false);

  constructor() {
    effect(() => {
      console.log("Dialog open state in service:", this.open());
    })
  }

  show() {
    console.log("Console log show");
    
    this.open.set(true);
  }

  close() {
    this.open.set(false);
  }
}
