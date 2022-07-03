import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContainerService {
  private index = 0;

  increaseIndex() {
    this.index = this.index + 1;
  }

  getIndex() {
    return this.index;
  }
}
