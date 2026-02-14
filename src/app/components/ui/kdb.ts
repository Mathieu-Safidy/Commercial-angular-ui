// kbd.component.ts
import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-kbd',
  imports: [
    NgClass
  ],
  template: `
    <kbd
      data-slot="kbd"
      [ngClass]="getClasses()"
      [attr.title]="title"
    >
      <ng-content></ng-content>
    </kbd>
  `
})
export class KbdComponent {
  @Input() className = '';
  @Input() title?: string;

  getClasses(): string[] {
    return [
      'bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium',
      '[&_svg:not([class*="size-"])]:size-3',
      '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
      this.className
    ];
  }
}

@Component({
  selector: 'app-kbd-group',
  imports: [
    NgClass
  ],
  template: `
    <div data-slot="kbd-group" [ngClass]="['inline-flex items-center gap-1', className]">
      <ng-content></ng-content>
    </div>
  `
})
export class KbdGroupComponent {
  @Input() className = '';
}
