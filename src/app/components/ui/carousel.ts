import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button';
import { LucideAngularModule } from 'lucide-angular';

export type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-carousel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div #carouselWrapper
         tabindex="0"
         (keydown)="onKeyDown($event)"
         class="relative"
         role="region"
         aria-roledescription="carousel"
    >
      <ng-content select="[carousel-content]"></ng-content>
    </div>
  `
})
export class CarouselComponent implements AfterViewInit {
  @Input() orientation: Orientation = 'horizontal';

  @Output() apiReady = new EventEmitter<any>();

  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef<HTMLDivElement>;

  canScrollPrev = false;
  canScrollNext = true;

  private items: HTMLElement[] = [];
  private currentIndex = 0;

  ngAfterViewInit() {
    this.items = Array.from(this.carouselWrapper.nativeElement.querySelectorAll('[carousel-item]'));
    this.updateButtons();
    this.apiReady.emit({
      scrollPrev: this.scrollPrev.bind(this),
      scrollNext: this.scrollNext.bind(this)
    });
  }

  scrollPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.scrollToIndex();
    }
  }

  scrollNext() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.scrollToIndex();
    }
  }

  private scrollToIndex() {
    const item = this.items[this.currentIndex];
    if (item) {
      if (this.orientation === 'horizontal') {
        item.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      } else {
        item.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.updateButtons();
    }
  }

  private updateButtons() {
    this.canScrollPrev = this.currentIndex > 0;
    this.canScrollNext = this.currentIndex < this.items.length - 1;
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.orientation === 'horizontal') {
      if (event.key === 'ArrowLeft') { this.scrollPrev(); event.preventDefault(); }
      if (event.key === 'ArrowRight') { this.scrollNext(); event.preventDefault(); }
    } else {
      if (event.key === 'ArrowUp') { this.scrollPrev(); event.preventDefault(); }
      if (event.key === 'ArrowDown') { this.scrollNext(); event.preventDefault(); }
    }
  }
}

@Component({
  selector: 'ui-carousel-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-hidden">
      <div class="flex" [ngClass]="orientationClass">
        <ng-content select="[carousel-item]"></ng-content>
      </div>
    </div>
  `
})
export class CarouselContentComponent {
  @Input() orientation: Orientation = 'horizontal';

  get orientationClass() {
    return this.orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col';
  }
}

@Component({
  selector: 'ui-carousel-item',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="min-w-0 shrink-0 grow-0 basis-full" [ngClass]="paddingClass"><ng-content></ng-content></div>`
})
export class CarouselItemComponent {
  @Input() orientation: Orientation = 'horizontal';

  get paddingClass() {
    return this.orientation === 'horizontal' ? 'pl-4' : 'pt-4';
  }
}

@Component({
  selector: 'ui-carousel-prev',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  template: `
    <button app-button
      [disabled]="!canScrollPrev"
      class="absolute h-8 w-8 rounded-full"
      [ngClass]="buttonPosition"
      (click)="scrollPrev()"
    >
      <i-lucide name="ArrowLeft" class="h-4 w-4"></i-lucide>
      <span class="sr-only">Previous slide</span>
    </button>
  `
})
export class CarouselPreviousComponent {
  @Input() orientation: Orientation = 'horizontal';
  @Input() canScrollPrev = false;
  @Input() scrollPrev = () => {};

  get buttonPosition() {
    return this.orientation === 'horizontal'
      ? '-left-12 top-1/2 -translate-y-1/2'
      : '-top-12 left-1/2 -translate-x-1/2 rotate-90';
  }
}

@Component({
  selector: 'ui-carousel-next',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  template: `
    <button app-button
      [disabled]="!canScrollNext"
      class="absolute h-8 w-8 rounded-full"
      [ngClass]="buttonPosition"
      (click)="scrollNext()"
    >
      <i-lucide name="ArrowRight" class="h-4 w-4"></i-lucide>
      <span class="sr-only">Next slide</span>
    </button>
  `
})
export class CarouselNextComponent {
  @Input() orientation: Orientation = 'horizontal';
  @Input() canScrollNext = false;
  @Input() scrollNext = () => {};

  get buttonPosition() {
    return this.orientation === 'horizontal'
      ? '-right-12 top-1/2 -translate-y-1/2'
      : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90';
  }
}
