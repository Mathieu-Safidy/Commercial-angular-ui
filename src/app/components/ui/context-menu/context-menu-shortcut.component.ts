import { Component } from '@angular/core'

@Component({
  selector: 'ui-context-menu-shortcut',
  standalone: true,
  template: `
    <span class="ml-auto text-xs tracking-widest text-muted-foreground">
      <ng-content></ng-content>
    </span>
  `,
})
export class ContextMenuShortcutComponent {}
