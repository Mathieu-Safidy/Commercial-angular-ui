import { Component, Input } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'ui-context-menu-sub-trigger',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      [ngClass]="[
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset ? 'pl-8' : ''
      ]"
    >
      <ng-content></ng-content>
      <span class="ml-auto h-4 w-4">▶</span>
    </div>
  `,
})
export class ContextMenuSubTriggerComponent {
  @Input() inset = false
}
