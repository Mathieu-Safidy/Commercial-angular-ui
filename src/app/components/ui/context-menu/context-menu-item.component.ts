import { Component, Input } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'ui-context-menu-item',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      [ngClass]="[
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset ? 'pl-8' : ''
      ]"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class ContextMenuItemComponent {
  @Input() inset = false
}
