import { Injectable } from '@angular/core';

@Injectable()
export class AvatarService {
  imageLoaded = false;

  showImage() {
    this.imageLoaded = true;
  }

  showFallback() {
    this.imageLoaded = false;
  }
}
