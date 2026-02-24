import { Directive, input } from '@angular/core';

type role = 'user' | 'boutique' | 'admin' ;

@Directive({
  selector: '[auth-directive]',
})
export class AuthDirective {

  constructor() { }
  
  hasRole = input<role>();

  verify(role: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.roles && user.roles.includes(role);
  }
}
