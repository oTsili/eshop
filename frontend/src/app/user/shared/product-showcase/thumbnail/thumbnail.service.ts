import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThumbnailService {
  private arrowClickListener = new Subject<number>();

  constructor() {}

  getArrowClickListener() {
    return this.arrowClickListener.asObservable();
  }

  onArrowClick(direction: number) {
    this.arrowClickListener.next(direction);
  }
}
