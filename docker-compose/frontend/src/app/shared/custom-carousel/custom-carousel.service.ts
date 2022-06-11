import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomCarouselService {
  constructor() {}

  private customIntervalListener = new Subject<{
    imagesLength: number;
  }>();

  getImagesLengthListener() {
    return this.customIntervalListener.asObservable();
  }

  onImagesLengthUpdate(imgsLen: number) {
    this.customIntervalListener.next({
      imagesLength: imgsLen,
    });
  }
}
