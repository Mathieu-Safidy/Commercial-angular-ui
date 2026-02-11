
import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

type Variant = 'default' | 'icon';

@Component({
  selector: 'app-empty',
  template: `
    <div
      data-slot="empty"
      [ngClass]="['flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center md:p-12', className]"
    >
      <!-- Header -->
      <div
        data-slot="empty-header"
        [ngClass]="['flex max-w-sm flex-col items-center gap-2 text-center', headerClass]"
      >
        <ng-content select="[empty-header]"></ng-content>
      </div>

      <!-- Media / Icon -->
      <div
        data-slot="empty-icon"
        [attr.data-variant]="variant"
        [ngClass]="getMediaClasses()"
      >
        <ng-content select="[empty-media]"></ng-content>
      </div>

      <!-- Title -->
      <div
        data-slot="empty-title"
        [ngClass]="['text-lg font-medium tracking-tight', titleClass]"
      >
        <ng-content select="[empty-title]"></ng-content>
      </div>

      <!-- Description -->
      <div
        data-slot="empty-description"
        [ngClass]="['text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary', descriptionClass]"
      >
        <ng-content select="[empty-description]"></ng-content>
      </div>

      <!-- Content -->
      <div
        data-slot="empty-content"
        [ngClass]="['flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-sm text-balance', contentClass]"
      >
        <ng-content select="[empty-content]"></ng-content>
      </div>
    </div>
  `,
  imports: [
    NgClass
  ],
  styles: []
})
export class EmptyComponent {
  @Input() className: string = '';
  @Input() headerClass: string = '';
  @Input() titleClass: string = '';
  @Input() descriptionClass: string = '';
  @Input() contentClass: string = '';

  @Input() variant: Variant = 'default';

  getMediaClasses(): string[] {
    const base = 'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0';
    const variantClasses: Record<Variant, string> = {
      default: 'bg-transparent',
      icon: 'bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*="size-"])]:size-6',
    };

    return [base, variantClasses[this.variant] ?? ''];
  }
}
