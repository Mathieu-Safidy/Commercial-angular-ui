import { Component, HostBinding, Input } from '@angular/core';
import { AvatarService } from './avatar.service';

@Component({
  selector: 'ui-avatar-image',
  template: `
    <img
      [src]="src"
      [alt]="alt"
      (load)="avatar.showImage()"
      (error)="avatar.showFallback()"
      [hidden]="!avatar.imageLoaded"
    />
  `
})
export class AvatarImageComponent {

  @Input() src!: string;
  @Input() alt = '';

  constructor(public avatar: AvatarService) {}

  @HostBinding('class')
  className = 'aspect-square h-full w-full';
}
