import { Component, Input } from '@angular/core'
import {NgIf} from '@angular/common';

@Component({
  selector: 'ui-context-menu-radio-item',
  standalone: true,
  template: `
    <div
      class="relative flex cursor-default select-none items-center
             rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none
             focus:bg-accent focus:text-accent-foreground
             data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <span *ngIf="selected">●</span>
      </span>

      <ng-content></ng-content>
    </div>
  `,
  imports: [
    NgIf
  ]
})
export class ContextMenuRadioItemComponent {
  @Input() selected = false
}
