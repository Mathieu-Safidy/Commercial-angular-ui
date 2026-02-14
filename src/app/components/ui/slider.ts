import { Component, Input, forwardRef, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

// Fonction cn comme utilitaire
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

@Component({
  selector: 'app-slider',
  template: `
    <div #sliderRoot [class]="computedClass" tabindex="0">
      <div class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary-20">
        <div class="absolute h-full bg-primary" [style.width.%]="value"></div>
      </div>
      <div
        class="block h-4 w-4 rounded-full border border-primary-50 bg-background shadow transition-colors"
        [style.left.%]="value"
        (mousedown)="startDrag($event)"
      ></div>
    </div>
  `,
  styles: [`
    .relative { position: relative; }
    .absolute { position: absolute; }
    .block { display: block; }
    .rounded-full { border-radius: 9999px; }
    .h-1\\.5 { height: 0.375rem; }
    .w-full { width: 100%; }
    .grow { flex-grow: 1; }
    .overflow-hidden { overflow: hidden; }
    .bg-primary\\/20 { background-color: rgba(0, 120, 250, 0.2); } /* ajuster la couleur */
    .bg-primary { background-color: rgba(0, 120, 250, 1); }
    .h-4 { height: 1rem; }
    .w-4 { width: 1rem; }
    .border { border-width: 1px; }
    .border-primary\\/50 { border-color: rgba(0, 120, 250, 0.5); }
    .bg-background { background-color: #fff; } /* ajuster selon ton thème */
    .shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .transition-colors { transition: background-color 0.2s, border-color 0.2s; }
    .disabled { pointer-events: none; opacity: 0.5; }
  `]
})
export class SliderComponent implements AfterViewInit {
  @Input() className?: string;
  @Input() value = 0; // valeur de 0 à 100

  computedClass = '';

  private dragging = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.computedClass = cn('relative flex w-full touch-none select-none items-center', this.className);

    this.renderer.listen('document', 'mousemove', (event) => {
      if (!this.dragging) return;
      this.updateValueFromEvent(event);
    });

    this.renderer.listen('document', 'mouseup', () => {
      this.dragging = false;
    });
  }

  startDrag(event: MouseEvent) {
    event.preventDefault();
    this.dragging = true;
    this.updateValueFromEvent(event);
  }

  private updateValueFromEvent(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    this.value = percent;
  }
}
