import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarouselService {
  private thumbnailListener = new Subject<string>();

  getThumbnailListener() {
    return this.thumbnailListener.asObservable();
  }

  onThumbnailUpdate(image: string) {
    this.thumbnailListener.next(image);
  }
}
