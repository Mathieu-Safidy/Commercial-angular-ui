import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-collapsible',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
})
export class CollapsibleComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  toggle() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}

@Component({
  selector: 'ui-collapsible-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `<button type="button" (click)="onClick()"><ng-content></ng-content></button>`,
})
export class CollapsibleTriggerComponent {
  constructor(private collapsible: CollapsibleComponent) {}

  onClick() {
    this.collapsible.toggle();
  }
}

@Component({
  selector: 'ui-collapsible-content',
  standalone: true,
  imports: [CommonModule],
  template: `<div *ngIf="collapsible.open"><ng-content></ng-content></div>`,
})
export class CollapsibleContentComponent {
  constructor(public collapsible: CollapsibleComponent) {}
}
