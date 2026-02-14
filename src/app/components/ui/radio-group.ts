import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-radio-group',
  template: `
    <div class="grid gap-2">
      <ng-content></ng-content>
    </div>
  `,
  styles: [``]
})
export class RadioGroupComponent {
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'app-radio-group-item',
  template: `
    <button
      type="button"
      (click)="select()"
      [attr.aria-checked]="selected"
      role="radio"
      [disabled]="disabled"
      class="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center"
    >
      <div
        *ngIf="selected"
        class="h-3.5 w-3.5 rounded-full bg-primary"
      ></div>
    </button>
  `,
  imports: [
    NgIf
  ],
  styles: [``]
})
export class RadioGroupItemComponent {
  @Input() value!: string;
  @Input() disabled = false;
  selected = false;

  constructor(private group: RadioGroupComponent) {}

  ngOnInit() {
    this.selected = this.group.value === this.value;
  }

  select() {
    if (this.disabled) return;
    this.selected = true;
    this.group.value = this.value;
    this.group.valueChange.emit(this.value);
  }
}
