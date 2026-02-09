import { Component, input, HostBinding } from '@angular/core';
import { cn } from '../../lib/utils';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `<ng-content />`,
})
export class CardComponent {
  className = input<string>('');
  @HostBinding('class') get hostClasses() {
    return cn("rounded-xl border bg-card text-card-foreground shadow block", this.className());
  }
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: `<ng-content />`,
})
export class CardHeaderComponent {
  className = input<string>('');
  @HostBinding('class') get hostClasses() {
    return cn("flex flex-col space-y-1.5 p-6 block", this.className());
  }
}

@Component({
  selector: 'h3[app-card-title]', // On l'utilise sur un h3 pour le SEO/Accessibilité
  standalone: true,
  template: `<ng-content />`,
})
export class CardTitleComponent {
  className = input<string>('');
  @HostBinding('class') get hostClasses() {
    return cn("font-semibold leading-none tracking-tight block", this.className());
  }
}

@Component({
  selector: 'p[app-card-description]',
  standalone: true,
  template: `<ng-content />`,
})
export class CardDescriptionComponent {
  className = input<string>('');
  @HostBinding('class') get hostClasses() {
    return cn("text-sm text-muted-foreground block", this.className());
  }
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  template: `<ng-content />`,
})
export class CardContentComponent {
  className = input<string>('');
  @HostBinding('class') get hostClasses() {
    return cn("p-6 pt-0 block", this.className());
  }
}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  template: `<ng-content />`,
})
export class CardFooterComponent {
  className = input<string>('');
  @HostBinding('class') get hostClasses() {
    return cn("flex items-center p-6 pt-0 block", this.className());
  }
}
