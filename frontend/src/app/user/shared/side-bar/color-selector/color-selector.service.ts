import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Color } from './color-selector.interfaces';

@Injectable({ providedIn: 'root' })
export class ColorSelectorService {
  activeStatusListener = new Subject<boolean[]>();
  private activeStatusArray: boolean[] = [];
  private colorsArr: Color[] = [
    //   { text_en: 'red', text_el: 'ΚΟΚΚΙΝΟ' },
    //   { text_en: 'blue', text_el: 'ΜΠΛΕ' },
    //   { text_en: 'green', text_el: 'ΠΡΑΣΙΝΟ' },
    //   { text_en: 'white', text_el: 'ΑΣΠΡΟ' },
    //   { text_en: 'beige', text_el: 'ΜΠΕΖ' },
    //   { text_en: 'brown', text_el: 'ΚΑΦΕ' },
    //   { text_en: 'yellow', text_el: 'ΚΙΤΡΙΝΟ' },
    //   { text_en: 'pink', text_el: 'ΡΟΖ' },
    //   { text_en: 'mocha', text_el: 'ΜΟΚΑ' },
    //   { text_en: 'purple', text_el: 'ΜΩΒ' },
    //   { text_en: 'orange', text_el: 'ΠΟΡΤΟΚΑΛΙ' },
  ];

  // getColorsArray() {
  //   return this.colorsArr;
  // }

  getActiveStatusListener() {
    return this.activeStatusListener.asObservable();
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
  onUpdateActiveStatus(index: number | null, chipValue?: string) {
    if (!index && chipValue) {
      console.log(index, chipValue);
      index = this.getColorArrayIndex(chipValue);
    }
    // fill the array with false value
    this.initializeActiveStatusArray();
    // set true to the provided index
    if (index != null) {
      this.activeStatusArray[index] = true;
    }
    // inform the app about the change
    this.activeStatusListener.next(this.activeStatusArray);
  }

  /**
   * fills the active status array with false values (initialize it)
   * and inform the app about the change
   */
  initializeActiveStatusArray() {
    this.activeStatusArray = Array(this.colorsArr.length).fill(false);
    this.activeStatusListener.next(this.activeStatusArray);
  }
  /**
   * finds and returns the index of a color from the color array
   * @param color :string
   * @returns:number the index of the color
   */
  getColorArrayIndex(color: string) {
    const colorIndex = this.colorsArr.findIndex((item) => {
      return item.text_el === color;
    });
    return colorIndex;
  }
}
