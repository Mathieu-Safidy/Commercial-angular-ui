// hover-card.component.ts
import { Component, Input, HostListener, TemplateRef, ContentChild, ElementRef } from '@angular/core';
import {NgIf, NgStyle} from '@angular/common';

type Align = 'center' | 'start' | 'end';

@Component({
  selector: 'app-hover-card',
  template: `
    <div class="relative inline-block" #triggerEl>
      <!-- Trigger -->
      <ng-content select="[hover-card-trigger]"></ng-content>

      <!-- Content -->
      <div
        *ngIf="open"
        class="z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none
               animate-in fade-in-0 zoom-in-95
               origin-top"
        [ngStyle]="getStyles()"
      >
        <ng-content select="[hover-card-content]"></ng-content>
      </div>
    </div>
  `,
  imports: [
    NgStyle,
    NgIf
  ],
  styles: [`
    .animate-in {
      transition: all 0.2s ease-out;
    }

    .fade-in-0 {
      opacity: 0.99;
    }

    .zoom-in-95 {
      transform: scale(0.95);
    }
  `]
})
export class HoverCardComponent {
  @Input() align: Align = 'center';
  @Input() sideOffset: number = 4;

  open = false;

  @HostListener('mouseenter') onMouseEnter() { this.open = true; }
  @HostListener('mouseleave') onMouseLeave() { this.open = false; }

  constructor(private elRef: ElementRef) {}

  getStyles() {

    let styles: any = { position: 'absolute', top: `calc(100% + ${this.sideOffset}px)` };

    switch(this.align) {
      case 'start': styles.left = '0'; break;
      case 'center': styles.left = '50%'; styles.transform = 'translateX(-50%)'; break;
      case 'end': styles.right = '0'; break;
    }
    return styles;
  }
}
