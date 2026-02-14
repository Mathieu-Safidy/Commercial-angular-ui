import { Component, input, HostBinding } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// On définit les variantes exactement comme dans ton code React
export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-emerald-500/10 text-emerald-500 shadow hover:bg-emerald-500/20",
        secondary:
          "border-transparent bg-amber-500/10 text-amber-500 shadow hover:bg-amber-500/20",
        primary:
          "border-transparent bg-primary/20 text-primary shadow hover:bg-primary/20",
        destructive:
          "border-transparent bg-destructive/10 text-destructive shadow hover:bg-destructive/20",
        outline: "text-foreground",
        dot : "px-0 py-0 border-transparent bg-emerald-500/10 text-emerald-500 shadow hover:bg-emerald-500/20"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<ng-content />`, // Équivalent de {children}
})
export class BadgeComponent {

  variant = input<BadgeVariants['variant']>('default');
  className = input<string>('');

  @HostBinding('class') get hostClasses() {
    return cn(
      badgeVariants({ variant: this.variant() }),
      this.className()
    );
  }
}
