import { Component, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-resizable-panel-group',
  template: `
    <div
      [ngClass]="{'flex flex-col': direction === 'vertical', 'flex flex-row': direction === 'horizontal'}"
      class="h-full w-full"
    >
      <ng-content></ng-content>
    </div>
  `,
  imports: [
    NgClass
  ],
  styles: [``]
})
export class ResizablePanelGroupComponent {
  @Input() direction: 'vertical' | 'horizontal' = 'horizontal';
}

@Component({
  selector: 'app-resizable-panel',
  template: `
    <div class="flex-1 overflow-auto">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host { display: flex; flex: 1 1 auto; min-width: 0; min-height: 0; }
  `]
})
export class ResizablePanelComponent {}

@Component({
  selector: 'app-resizable-handle',
  template: `
    <div
      class="relative flex items-center justify-center bg-border"
      [ngStyle]="handleStyle"
      (mousedown)="onMouseDown($event)"
    >
      <div *ngIf="withHandle" class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <span class="h-2.5 w-2.5 bg-gray-500 block"></span>
      </div>
    </div>
  `,
  imports: [
    NgStyle,
    NgIf
  ],
  styles: [`
    :host {
      cursor: col-resize;
      user-select: none;
    }
  `]
})
export class ResizableHandleComponent implements AfterViewInit {
  @Input() withHandle = false;
  @Input() direction: 'vertical' | 'horizontal' = 'horizontal';
  private dragging = false;
  private startPos = 0;
  private prevPanel!: HTMLElement;
  private nextPanel!: HTMLElement;

  handleStyle: any = {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.el.nativeElement.style.userSelect = 'none';
    this.el.nativeElement.style.flexShrink = '0';
    if (this.direction === 'vertical') {
      this.handleStyle.height = '4px';
      this.handleStyle.width = '100%';
      this.el.nativeElement.style.cursor = 'row-resize';
    } else {
      this.handleStyle.width = '4px';
      this.handleStyle.height = '100%';
      this.el.nativeElement.style.cursor = 'col-resize';
    }
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.dragging = true;

    // Récupère les panneaux avant et après le handle
    const parent = this.el.nativeElement.parentElement;
    const children = Array.from(parent.children) as HTMLElement[];
    const index = children.indexOf(this.el.nativeElement);
    this.prevPanel = children[index - 1];
    this.nextPanel = children[index + 1];

    if (this.direction === 'horizontal') {
      this.startPos = event.clientX;
    } else {
      this.startPos = event.clientY;
    }

    this.renderer.addClass(document.body, 'resizing');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;

    let delta = this.direction === 'horizontal'
      ? event.clientX - this.startPos
      : event.clientY - this.startPos;

    if (this.prevPanel && this.nextPanel) {
      const prevSize = this.direction === 'horizontal'
        ? this.prevPanel.offsetWidth
        : this.prevPanel.offsetHeight;
      const nextSize = this.direction === 'horizontal'
        ? this.nextPanel.offsetWidth
        : this.nextPanel.offsetHeight;

      const newPrevSize = prevSize + delta;
      const newNextSize = nextSize - delta;

      if (newPrevSize > 0 && newNextSize > 0) {
        if (this.direction === 'horizontal') {
          this.prevPanel.style.flex = `0 0 ${newPrevSize}px`;
          this.nextPanel.style.flex = `0 0 ${newNextSize}px`;
        } else {
          this.prevPanel.style.flex = `0 0 ${newPrevSize}px`;
          this.nextPanel.style.flex = `0 0 ${newNextSize}px`;
        }
        this.startPos = this.direction === 'horizontal' ? event.clientX : event.clientY;
      }
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.dragging = false;
    this.renderer.removeClass(document.body, 'resizing');
  }
}
