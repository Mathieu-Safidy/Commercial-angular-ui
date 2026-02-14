import { Component, Input, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-scroll-bar',
  template: `
    <div
      class="flex touch-none select-none transition-colors absolute bg-transparent"
      [ngClass]="{
        'h-full w-2.5 right-0 top-0 border-l border-l-transparent p-1': orientation==='vertical',
        'h-2.5 w-full bottom-0 left-0 border-t border-t-transparent p-1': orientation==='horizontal'
      }"
      #scrollbar
    >
      <div class="relative flex-1 rounded-full bg-border" #thumb></div>
    </div>
  `,
  imports: [
    NgClass
  ],
  styles: [``]
})
export class ScrollBarComponent implements AfterViewInit {
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const viewport = this.el.nativeElement.closest('app-scroll-area')?.querySelector('div');
    const thumb = this.el.nativeElement.querySelector('div');

    if (!viewport || !thumb) return;

    const updateThumb = () => {
      if (this.orientation === 'vertical') {
        const ratio = viewport.clientHeight / viewport.scrollHeight;
        thumb.style.height = `${viewport.clientHeight * ratio}px`;
        thumb.style.top = `${viewport.scrollTop * ratio}px`;
      } else {
        const ratio = viewport.clientWidth / viewport.scrollWidth;
        thumb.style.width = `${viewport.clientWidth * ratio}px`;
        thumb.style.left = `${viewport.scrollLeft * ratio}px`;
      }
    };

    viewport.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);
    updateThumb();
  }
}

@Component({
  selector: 'app-scroll-area',
  template: `
    <div class="relative overflow-hidden" #root>
      <div class="h-full w-full" #viewport>
        <ng-content></ng-content>
      </div>
      <app-scroll-bar orientation="vertical"></app-scroll-bar>
      <app-scroll-bar orientation="horizontal"></app-scroll-bar>
    </div>
  `,
  imports: [
    ScrollBarComponent
  ],
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `]
})
export class ScrollAreaComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Vous pouvez ajouter des comportements supplémentaires ici si nécessaire
  }
}

