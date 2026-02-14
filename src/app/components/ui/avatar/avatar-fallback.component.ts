import { Component, HostBinding } from '@angular/core';
import { AvatarService } from './avatar.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-avatar-fallback',
  imports: [NgIf],
  template: `
    <div *ngIf="!avatar.imageLoaded">
      <ng-content></ng-content>
    </div>
  `
})
export class AvatarFallbackComponent {

  constructor(public avatar: AvatarService) {}

  @HostBinding('class')
  className =
    'flex h-full w-full items-center justify-center rounded-full bg-muted';
}
