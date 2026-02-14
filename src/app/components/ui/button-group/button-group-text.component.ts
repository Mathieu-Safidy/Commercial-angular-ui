import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-button-group-text',
  template: `<ng-content></ng-content>`
})
export class ButtonGroupTextComponent {

  @Input() className = '';

  get hostClasses(): string {
    return [
      'bg-muted shadow-xs flex items-center gap-2 rounded-md border px-4 text-sm font-medium',
      this.className
    ].join(' ');
  }
}
