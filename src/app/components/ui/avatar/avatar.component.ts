import { Component, HostBinding } from '@angular/core';
import { AvatarService } from './avatar.service';

@Component({
  selector: 'ui-avatar',
  template: `<ng-content></ng-content>`,
  providers: [AvatarService]
})
export class AvatarComponent {

  constructor(public avatar: AvatarService) {}

  @HostBinding('class')
  className =
    'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full';
}
