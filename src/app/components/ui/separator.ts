import { Component, input, HostBinding } from '@angular/core';
import { cn } from '../../lib/utils';
@Component({
  selector: 'app-separator',
  standalone: true,
  template: '',
  styles: [],
})
export class SeparatorComponent {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  decorative = input<boolean>(true);
  className = input<string>('');

  @HostBinding('attr.role') get role() {
    return this.decorative() ? 'none' : 'separator';
  }

  @HostBinding('attr.aria-orientation') get ariaOrientation() {
    return this.orientation() === 'vertical' ? 'vertical' : null;
  }

  @HostBinding('class') get hostClasses() {
    return cn(
      "shrink-0 bg-border block", // 'block' est important car le composant est 'inline' par défaut
      this.orientation() === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      this.className()
    );
  }
}
