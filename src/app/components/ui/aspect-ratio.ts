import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-aspect-ratio',
  template: `
    <div class="relative w-full" [style.paddingTop.%]="paddingTop">
      <div class="absolute inset-0">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AspectRatio {


  @Input() ratio = 1;

  get paddingTop(): number {
    return (1 / this.ratio) * 100;
  }
}
