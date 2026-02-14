import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-command',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
})
export class CommandComponent {}

@Component({
  selector: 'ui-command-dialog',
  standalone: true,
  imports: [CommonModule, CommandComponent],
  template: `
    <div class="dialog-backdrop">
      <div class="dialog-content overflow-hidden p-0">
        <ui-command class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-1.5">
          <ng-content></ng-content>
        </ui-command>
      </div>
    </div>
  `,
})
export class CommandDialogComponent {}

@Component({
  selector: 'ui-command-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center border-b px-3">
      <svg class="mr-2 h-4 w-4 opacity-50"><!-- icon --></svg>
      <input
        type="text"
        class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
        [placeholder]="placeholder"
      />
    </div>
  `,
})
export class CommandInputComponent {
  @Input() placeholder = 'Search...';
}

@Component({
  selector: 'ui-command-list',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="max-h-[300px] overflow-y-auto overflow-x-hidden"><ng-content></ng-content></div>`,
})
export class CommandListComponent {}

@Component({
  selector: 'ui-command-empty',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="py-6 text-center text-sm"><ng-content></ng-content></div>`,
})
export class CommandEmptyComponent {}

@Component({
  selector: 'ui-command-group',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="overflow-hidden p-1 text-foreground"><ng-content></ng-content></div>`,
})
export class CommandGroupComponent {}

@Component({
  selector: 'ui-command-item',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5"><ng-content></ng-content></div>`,
})
export class CommandItemComponent {}

@Component({
  selector: 'ui-command-shortcut',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="ml-auto text-xs tracking-widest text-muted-foreground"><ng-content></ng-content></span>`,
})
export class CommandShortcutComponent {}

@Component({
  selector: 'ui-command-separator',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="-mx-1 h-px bg-border"></div>`,
})
export class CommandSeparatorComponent {}
