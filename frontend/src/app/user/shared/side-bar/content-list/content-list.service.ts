import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContentListService {
  private heelHeighActiveStatusListener = new Subject<boolean[]>();
  private salesActiveStatusListener = new Subject<boolean[]>();
  private materialActiveStatusListener = new Subject<boolean[]>();
  private heelHeighActiveStatusArray: boolean[] = [];
  private salesActiveStatusArray: boolean[] = [];
  private materialActiveStatusArray: boolean[] = [];

  private heelHeightArr: string[] = [];
  private salesArr: string[] = [];
  private materialArr: string[] = [];

  set heelHeighArray(heelHeighArr: string[]) {
    this.heelHeightArr = heelHeighArr;
  }
  set salesArray(salesArr: string[]) {
    this.salesArr = salesArr;
  }
  set materialArray(matArr: string[]) {
    this.materialArr = matArr;
  }

  get heelHeighArray() {
    return this.heelHeightArr;
  }
  get salesArray() {
    return this.salesArr;
  }
  get materialArray() {
    return this.materialArr;
  }

  getHeelHeighActiveStatusListener() {
    return this.heelHeighActiveStatusListener.asObservable();
  }

  getSalesActiveStatusListener() {
    return this.salesActiveStatusListener.asObservable();
  }

  getMaterialActiveStatusListener() {
    return this.materialActiveStatusListener.asObservable();
  }

  //   onUpdateHeelHeighActiveStatusArray(index: number | null, chipValue?: string) {
  //     if (!index && chipValue) {
  //       console.log(index, chipValue);
  //       index = this.getColorArrayIndex(chipValue);
  //     }
  //     // fill the array with false value
  //     this.initializeActiveStatusArray();
  //     // set true to the provided index
  //     if (index) {
  //       this.activeStatusArray[index] = true;
  //     }
  //     // inform the app about the change
  //     this.activeStatusListener.next(this.activeStatusArray);
  //   }
  //   onUpdateSalesActiveStatusArray(index: number | null, chipValue?: string) {
  //     if (!index && chipValue) {
  //       console.log(index, chipValue);
  //       index = this.getColorArrayIndex(chipValue);
  //     }
  //     // fill the array with false value
  //     this.initializeActiveStatusArray();
  //     // set true to the provided index
  //     if (index) {
  //       this.activeStatusArray[index] = true;
  //     }
  //     // inform the app about the change
  //     this.activeStatusListener.next(this.activeStatusArray);
  //   }
  //   onUpdatematerialActiveStatusArray(index: number | null, chipValue?: string) {
  //     if (!index && chipValue) {
  //       console.log(index, chipValue);
  //       index = this.getColorArrayIndex(chipValue);
  //     }
  //     // fill the array with false value
  //     this.initializeActiveStatusArray();
  //     // set true to the provided index
  //     if (index) {
  //       this.activeStatusArray[index] = true;
  //     }
  //     // inform the app about the change
  //     this.activeStatusListener.next(this.activeStatusArray);
  //   }

  getSubstring(str: string, start: string, end: string): string {
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end);
    if (startIndex != -1 && endIndex != -1 && endIndex >= startIndex) {
      return str.substring(startIndex, endIndex);
    } else {
      return '';
    }
  }
}
