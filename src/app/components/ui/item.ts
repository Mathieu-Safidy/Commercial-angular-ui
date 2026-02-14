// item-group.component.ts
import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

type ItemVariant = 'default' | 'outline' | 'muted';
type ItemSize = 'default' | 'sm';
type ItemMediaVariant = 'default' | 'icon' | 'image';

@Component({
  selector: 'app-item-group',
  template: `<div role="list" data-slot="item-group" class="group/item-group flex flex-col"><ng-content></ng-content></div>`
})
export class ItemGroupComponent {}

@Component({
  selector: 'app-item-separator',
  template: `<div data-slot="item-separator" class="my-0"><ng-content></ng-content></div>`
})
export class ItemSeparatorComponent {}

@Component({
  selector: 'app-item',
  imports: [
    NgClass
  ],
  template: `
    <div
      data-slot="item"
      [attr.data-variant]="variant"
      [attr.data-size]="size"
      [ngClass]="getItemClasses()"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class ItemComponent {
  @Input() variant: ItemVariant = 'default';
  @Input() size: ItemSize = 'default';
  @Input() className = '';

  getItemClasses() {
    const base = 'group/item [a]:hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 [a]:transition-colors flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-[3px]';
    const variantClasses: Record<ItemVariant, string> = {
      default: 'bg-transparent',
      outline: 'border-border',
      muted: 'bg-muted/50'
    };
    const sizeClasses: Record<ItemSize, string> = {
      default: 'gap-4 p-4',
      sm: 'gap-2.5 px-4 py-3'
    };
    return [base, variantClasses[this.variant], sizeClasses[this.size], this.className];
  }
}

@Component({
  selector: 'app-item-media',
  imports: [
    NgClass
  ],
  template: `
    <div
      data-slot="item-media"
      [attr.data-variant]="variant"
      [ngClass]="getMediaClasses()"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class ItemMediaComponent {
  @Input() variant: ItemMediaVariant = 'default';
  @Input() className = '';

  getMediaClasses() {
    const base = 'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none';
    const variants: Record<ItemMediaVariant, string> = {
      default: 'bg-transparent',
      icon: 'bg-muted size-8 rounded-sm border [&_svg:not([class*="size-"])]:size-4',
      image: 'size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover'
    };
    return [base, variants[this.variant], this.className];
  }
}

@Component({
  selector: 'app-item-content',
  template: `<div data-slot="item-content" class="flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none"><ng-content></ng-content></div>`
})
export class ItemContentComponent {}

@Component({
  selector: 'app-item-title',
  template: `<div data-slot="item-title" class="flex w-fit items-center gap-2 text-sm font-medium leading-snug"><ng-content></ng-content></div>`
})
export class ItemTitleComponent {}

@Component({
  selector: 'app-item-description',
  template: `<p data-slot="item-description" class="text-muted-foreground line-clamp-2 text-balance text-sm font-normal leading-normal [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4"><ng-content></ng-content></p>`
})
export class ItemDescriptionComponent {}

@Component({
  selector: 'app-item-actions',
  template: `<div data-slot="item-actions" class="flex items-center gap-2"><ng-content></ng-content></div>`
})
export class ItemActionsComponent {}

@Component({
  selector: 'app-item-header',
  template: `<div data-slot="item-header" class="flex basis-full items-center justify-between gap-2"><ng-content></ng-content></div>`
})
export class ItemHeaderComponent {}

@Component({
  selector: 'app-item-footer',
  template: `<div data-slot="item-footer" class="flex basis-full items-center justify-between gap-2"><ng-content></ng-content></div>`
})
export class ItemFooterComponent {}
