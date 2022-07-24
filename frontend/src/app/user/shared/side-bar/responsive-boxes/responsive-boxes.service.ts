import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponsiveBox } from './responsive-boxes.interfaces';

@Injectable({ providedIn: 'root' })
export class ResponsiveBoxesService {
  colorActiveStatusListener = new Subject<boolean[]>();
  sizeActiveStatusListener = new Subject<boolean[]>();
  // private activeStatusArray: boolean[] = [];
  private colorArr: ResponsiveBox[] = [];
  private sizeArr: ResponsiveBox[] = [];
  private colorActiveStatusArray: boolean[] = [];
  private sizeActiveStatusArray: boolean[] = [];

  set colorArray(colorArr: ResponsiveBox[]) {
    this.colorArr = colorArr;
  }

  set sizeArray(sizeArr: ResponsiveBox[]) {
    this.sizeArr = sizeArr;
  }

  getColorActiveStatusListener() {
    return this.colorActiveStatusListener.asObservable();
  }
  getSizeActiveStatusListener() {
    return this.sizeActiveStatusListener.asObservable();
  }
  /**
   * Used from inside the colorCompnent and from outside. In the
   * first case only the index is provided, thus the active status array is
   * updated and the app is informed. In the second case the index is searched
   * from the chipValue that is provided. In this case the index provided is null.
   * @param index the index of the value to be updated
   * @param chipValue optional. The value of the chip, to be used in the
   * getArrayIndex function to get the index of the item to be updated
   */
  onUpdateColorActiveStatus(index: number | null, chipValue?: string) {
    if (!index && chipValue) {
      index = this.getElementArrayIndex(chipValue, this.colorArr);
    }
    // fill the array with false value
    this.initializeColorActiveStatusArray();
    // set true to the provided index
    if (index != null) {
      this.colorActiveStatusArray[index] = true;
    }
    // inform the app about the change
    this.colorActiveStatusListener.next(this.colorActiveStatusArray);
  }
  /**
   * Used from inside the colorCompnent and from outside. In the
   * first case only the index is provided, thus the active status array is
   * updated and the app is informed. In the second case the index is searched
   * from the chipValue that is provided. In this case the index provided is null.
   * @param index the index of the value to be updated
   * @param chipValue optional. The value of the chip, to be used in the
   * getArrayIndex function to get the index of the item to be updated
   */
  onUpdateSizeActiveStatus(index: number | null, chipValue?: string) {
    if (!index && chipValue) {
      index = this.getElementArrayIndex(chipValue, this.sizeArr);
    }
    // fill the array with false value
    this.initializeSizeActiveStatusArray();
    // set true to the provided index
    if (index != null) {
      this.sizeActiveStatusArray[index] = true;
    }
    // inform the app about the change
    this.sizeActiveStatusListener.next(this.sizeActiveStatusArray);
  }

  /**
   * fills the active status array with false values (initialize it)
   * and inform the app about the change
   */
  initializeColorActiveStatusArray() {
    this.colorActiveStatusArray = Array(this.colorArr.length).fill(false);
    this.colorActiveStatusListener.next(this.colorActiveStatusArray);
  }
  /**
   * fills the active status array with false values (initialize it)
   * and inform the app about the change
   */
  initializeSizeActiveStatusArray() {
    this.sizeActiveStatusArray = Array(this.sizeArr.length).fill(false);
    this.sizeActiveStatusListener.next(this.sizeActiveStatusArray);
  }
  /**
   * finds and returns the index of a elements from the elementsArray
   * @param text :string
   * @returns:number the index of the text
   */
  getElementArrayIndex(text: string, elementsArr: ResponsiveBox[]) {
    const colorIndex = elementsArr.findIndex((item) => {
      return item.text === text;
    });
    return colorIndex;
  }
}
