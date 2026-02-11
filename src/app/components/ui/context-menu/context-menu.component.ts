import { Component } from '@angular/core'

@Component({
  selector: 'ui-context-menu',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class ContextMenuComponent {}
