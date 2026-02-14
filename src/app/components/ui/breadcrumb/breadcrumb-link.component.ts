import { Component, HostBinding, Input  } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-breadcrumb-link',
  imports: [NgIf, RouterModule],
  template: `
    <a
      *ngIf="href"
      [href]="href"
      class="transition-colors hover:text-foreground"
    >
      <ng-content></ng-content>
    </a>

    <a
      *ngIf="routerLink"
      [routerLink]="routerLink"
      class="transition-colors hover:text-foreground"
    >
      <ng-content></ng-content>
    </a>
  `
})
export class BreadcrumbLinkComponent {

  @Input() href?: string;
  @Input() routerLink?: string | any[];
}
