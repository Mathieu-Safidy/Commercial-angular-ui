import { Component, input, HostBinding } from '@angular/core';
import { cn } from '../../lib/utils';

@Component({
  selector: 'app-progress',
  standalone: true,
  template: `
    <div
      class="h-full w-full flex-1 bg-primary transition-all"
      [style.transform]="'translateX(-' + (100 - (value() || 0)) + '%)'"
    ></div>
  `,
})
export class ProgressComponent {
  // Input Signal pour la valeur (0 à 100)
  value = input<number>(0);

  // Possibilité de surcharger les classes du conteneur
  className = input<string>('');

  @HostBinding('class') get hostClasses() {
    return cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20 block",
      this.className()
    );
  }
}
