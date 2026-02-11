import { Component, Input } from '@angular/core';
import { SeparatorComponent } from '../separator';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-button-group-separator',
  standalone: true,
  imports: [SeparatorComponent],
  template: `
    <app-separator
      [orientation]="orientation"
      data-slot="button-group-separator"
      [class]="classes"
    ></app-separator>
  `
})
export class ButtonGroupSeparatorComponent {

  @Input() orientation: Orientation = 'vertical';
  @Input() className = '';

  get classes(): string {
    return [
      'bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto',
      this.className
    ].join(' ');
  }
}
