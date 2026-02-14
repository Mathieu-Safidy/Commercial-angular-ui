import { Component, Input } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'ui-context-menu-label',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      [ngClass]="[
        'px-2 py-1.5 text-sm font-semibold text-foreground',
        inset ? 'pl-8' : ''
      ]"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class ContextMenuLabelComponent {
  @Input() inset = false
}
