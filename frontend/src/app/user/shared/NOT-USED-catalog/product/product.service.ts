import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private index = 0;

  get itemIndex() {
    return this.index;
  }

  set itemIndex(idx: number) {
    if (idx === undefined) {
      console.log('index not provided');
      return;
    }
    this.index = idx;
  }
}
