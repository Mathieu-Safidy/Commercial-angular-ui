import { Directive, inject, Input, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthServices } from '../../services/authService/auth.services';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class RoleDirective {
  // role = input('role') as string;
  hasRole = input<string | string[]>([]);
  templateRef = inject(TemplateRef<unknown>);
  viewContainer = inject(ViewContainerRef);
  authService = inject(AuthServices);
  
  constructor(
    // private templateRef: TemplateRef<unknown>,
    // private viewContainer: ViewContainerRef,
    // private authService: AuthServices
  ) {}

  ngOnInit(): void {
    const roles = Array.isArray(this.hasRole())
      ? this.hasRole() as string[]
      : [this.hasRole() as string];

    const userRole = this.authService.currentUserSubject.value?.role || ''; // ex: 'admin', 'user', 'manager'

    if (roles.includes(userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
