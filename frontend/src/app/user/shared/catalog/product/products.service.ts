import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private index = 0;

  get itemIndex() {
    return this.index;
  }

  set itemIndex(idx: number) {
    if (!idx) {
      console.log('index provided');
      return;
    }
    this.index = idx;
  }
}
