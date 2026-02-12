import { Component, input, HostBinding, signal, contentChildren, effect, inject, HostListener } from '@angular/core';
import { cn } from '../../lib/utils';

// --- 1. TABS ROOT ---
@Component({
  selector: 'app-tabs',
  standalone: true,
  template: `<ng-content />`,
})
export class TabsComponent {
  defaultValue = input<string>('');
  value = signal<string>('');

  constructor() {
    // Initialise la valeur par défaut
    effect(() => {
      if (this.defaultValue() && !this.value()) {
        this.value.set(this.defaultValue());
      }
    }, { allowSignalWrites: true });
  }
}

// --- 2. TABS LIST ---
@Component({
  selector: 'app-tabs-list',
  standalone: true,
  template: `<ng-content />`,
})
export class TabsListComponent {
  className = input<string>('');

  @HostBinding('class') get hostClasses() {
    return cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      this.className()
    );
  }
}

@Component({
  selector: 'button[appTabsTrigger]',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick()'
  }
})
export class TabsTriggerComponent {
  value = input.required<string>(); // La valeur liée à ce bouton
  className = input<string>('');
  private parent = inject(TabsComponent);
  // constructor(private parent: TabsComponent) {}

  @HostBinding('attr.role') role = 'tab';

  @HostBinding('class') get hostClasses() {
    return cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      this.parent.value() === this.value()
        ? "bg-[hsl(var(--background))] text-foreground shadow-md"
        : "",
      this.className()
    );
  }

  @HostBinding('attr.data-state') get state() {
    return this.parent.value() === this.value() ? 'active' : 'inactive';
  }

  @HostListener('click') onClick() {
    this.parent.value.set(this.value());
  }
}

// --- 4. TABS CONTENT ---
@Component({
  selector: 'div[appTabsContent]',
  standalone: true,
  template: `
    @if (parent.value() === value()) {
      <ng-content />
    }
  `,
})
export class TabsContentComponent {
  value = input.required<string>();
  className = input<string>('');

  public parent = inject(TabsComponent);

  @HostBinding('class') get hostClasses() {
    return cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      this.className()
    );
  }
}
