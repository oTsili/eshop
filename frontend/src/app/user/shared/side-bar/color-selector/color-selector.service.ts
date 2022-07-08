import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductsService } from '../../products/products.service';

@Injectable({ providedIn: 'root' })
export class ColorSelectorService {
  activeStatusListener = new Subject<boolean[]>();
  private activeStatusArray: boolean[] = [];
  private colorsArr = [
    { color: 'red' },
    { color: 'blue' },
    { color: 'green' },
    { color: 'white' },
    { color: 'beige' },
    { color: 'brown' },
    { color: 'yellow' },
    { color: 'pink' },
    { color: 'mocha' },
    { color: 'purple' },
    { color: 'orange' },
  ];

  getColorsArray() {
    return this.colorsArr;
  }

  getActiveStatusListener() {
    return this.activeStatusListener.asObservable();
  }

  onUpdateActiveStatus(index: number | null, chipValue?: string) {
    console.log('paok');
    if (!index && chipValue) {
      console.log(index, chipValue);
      index = this.getColorArrayIndex(chipValue);
    }
    // fill the array with false value
    this.initializeActiveStatusArray();
    // set true to the provided index
    if (index) {
      this.activeStatusArray[index] = true;
    }
    // inform the app about the change
    this.activeStatusListener.next(this.activeStatusArray);
  }

  initializeActiveStatusArray() {
    this.activeStatusArray = Array(this.colorsArr.length).fill(false);
    this.activeStatusListener.next(this.activeStatusArray);
  }

  // toggleActiveStatus(index: number) {
  //   this.initializeActiveStatusArray();
  //   this.activeStatus[index] = !this.activeStatus[index];
  // }

  // getActiveStatusArray() {
  //   return this.activeStatus;
  // }

  getColorArrayIndex(color: string) {
    const colorIndex = this.colorsArr.findIndex((item) => {
      return item.color === color;
    });
    return colorIndex;
  }
}
