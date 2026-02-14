import { Component, Input, HostBinding } from '@angular/core';

type AlertVariant = 'default' | 'destructive';

@Component({
  selector: 'ui-alert',
  template: `<ng-content></ng-content>`
})
export class AlertComponent {

  @Input() variant: AlertVariant = 'default';

  @HostBinding('attr.role')
  role = 'alert';

  @HostBinding('class')
  get hostClasses(): string {
    const base =
      'relative w-full rounded-lg border px-4 py-3 text-sm ' +
      '[&>svg+div]:translate-y-[-3px] ' +
      '[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 ' +
      '[&>svg]:text-foreground [&>svg~*]:pl-7';

    const variants: Record<AlertVariant, string> = {
      default: 'bg-background text-foreground',
      destructive:
        'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive'
    };

    return `${base} ${variants[this.variant]}`;
  }
}
