import { Component, Input, TemplateRef, ContentChild, ElementRef, AfterViewInit } from '@angular/core';
import { cn } from '../../lib/utils';
import {NgClass} from '@angular/common';

// Le Provider n'a pas besoin d'être explicite en Angular, on peut juste utiliser un composant racine
@Component({
  selector: 'app-tooltip-provider',
  template: `<ng-content></ng-content>`,
})
export class TooltipProviderComponent {}

// Tooltip Root
@Component({
  selector: 'app-tooltip',
  template: `<ng-content></ng-content>`,
})
export class TooltipComponent {}

// Tooltip Trigger
@Component({
  selector: 'app-tooltip-trigger',
  template: `<ng-content></ng-content>`,
})
export class TooltipTriggerComponent {}

// Tooltip Content
@Component({
  selector: 'app-tooltip-content',
  template: `
    <div
      #content
      [ngClass]="classes"
      [style.--radix-tooltip-content-transform-origin]="transformOrigin"
      [style.zIndex]="50"
    >
      <ng-content></ng-content>
    </div>
  `,
  imports: [
    NgClass
  ]
})
export class TooltipContentComponent implements AfterViewInit {
  @Input() sideOffset: number = 4; // équivalent à sideOffset={4}
  @Input() side: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @Input() className?: string;

  @ContentChild(TemplateRef) template!: TemplateRef<any>;

  classes: string = '';
  transformOrigin: string = 'center';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.classes = cn(
      'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 ' +
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 ' +
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 ' +
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]',
      this.className
    );

    // Ici on pourrait calculer transformOrigin selon le positionnement si besoin
    this.transformOrigin = 'center';
  }
}
