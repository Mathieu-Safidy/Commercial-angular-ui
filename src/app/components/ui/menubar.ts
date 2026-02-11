// menubar.component.ts
import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-menubar',
  template: `
    <div
      class="flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm"
      [ngClass]="className"
    >
      <ng-content></ng-content>
    </div>
  `,
  imports: [
    NgClass
  ]
})
export class MenubarComponent {
  @Input() className = '';
}

// menubar-trigger.component.ts
@Component({
  selector: 'app-menubar-trigger',
  template: `
    <button
      class="flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none
      focus:bg-accent focus:text-accent-foreground"
      [ngClass]="className"
    >
      <ng-content></ng-content>
    </button>
  `,
  imports: [
    NgClass
  ]
})
export class MenubarTriggerComponent {
  @Input() className = '';
}

// menubar-content.component.ts
@Component({
  selector: 'app-menubar-content',
  template: `
    <div
      class="z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
      [ngClass]="className"
    >
      <ng-content></ng-content>
    </div>
  `,
  imports: [
    NgClass
  ]
})
export class MenubarContentComponent {
  @Input() className = '';
}

// menubar-item.component.ts
@Component({
  selector: 'app-menubar-item',
  template: `
    <div
      class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none
      focus:bg-accent focus:text-accent-foreground"
      [ngClass]="className"
    >
      <ng-content></ng-content>
    </div>
  `,
  imports: [
    NgClass
  ]
})
export class MenubarItemComponent {
  @Input() className = '';
}

// menubar-separator.component.ts
@Component({
  selector: 'app-menubar-separator',
  template: `
    <div class="-mx-1 my-1 h-px bg-muted" [ngClass]="className"></div>`,
  imports: [
    NgClass
  ]
})
export class MenubarSeparatorComponent {
  @Input() className = '';
}

// menubar-label.component.ts
@Component({
  selector: 'app-menubar-label',
  template: `
    <div class="px-2 py-1.5 text-sm font-semibold" [ngClass]="className">
      <ng-content></ng-content>
    </div>`,
  imports: [
    NgClass
  ]
})
export class MenubarLabelComponent {
  @Input() className = '';
}

// menubar-shortcut.component.ts
@Component({
  selector: 'app-menubar-shortcut',
  template: `<span class="ml-auto text-xs tracking-widest text-muted-foreground" [ngClass]="className"><ng-content></ng-content></span>`,
  imports: [
    NgClass
  ]
})
export class MenubarShortcutComponent {
  @Input() className = '';
}
