import { Component, Input, HostBinding } from '@angular/core';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-button-group',
  template: `<ng-content></ng-content>`
})
export class ButtonGroupComponent {

  @Input() orientation: Orientation = 'horizontal';

  @HostBinding('attr.role') role = 'group';
  @HostBinding('attr.data-slot') slot = 'button-group';
  @HostBinding('attr.data-orientation')
  get dataOrientation() { return this.orientation; }

  @HostBinding('class')
  get hostClasses(): string {
    // Base classes
    let base =
      'flex w-fit items-stretch ' +
      '[&>*]:focus-visible:relative [&>*]:focus-visible:z-10 ' +
      '[&>input]:flex-1';

    // Orientation variants
    if (this.orientation === 'horizontal') {
      base +=
        ' [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none';
    } else {
      base +=
        ' flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none';
    }

    return base;
  }
}
