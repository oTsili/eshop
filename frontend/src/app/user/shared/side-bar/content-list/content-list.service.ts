import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ContentList } from './content-list.interfaces';

@Injectable({ providedIn: 'root' })
export class ContentListService {
  private heelHeighActiveStatusListener = new Subject<boolean[]>();
  private salesActiveStatusListener = new Subject<boolean[]>();
  private materialActiveStatusListener = new Subject<boolean[]>();
  private heelHeighActiveStatusArray: boolean[] = [];
  private salesActiveStatusArray: boolean[] = [];
  private materialActiveStatusArray: boolean[] = [];

  private heelHeightArr: ContentList[] = [];
  private salesArr: ContentList[] = [];
  private materialArr: ContentList[] = [];
  private currentIndex: number;

  constructor(private appService: AppService) {}

  set heelHeighArray(heelHeighArr: ContentList[]) {
    this.heelHeightArr = heelHeighArr;
  }
  set salesArray(salesArr: ContentList[]) {
    this.salesArr = salesArr;
  }
  set materialArray(matArr: ContentList[]) {
    this.materialArr = matArr;
  }

  get index() {
    return this.currentIndex;
  }

  set index(index: number) {
    this.currentIndex = index;
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

  // Fills the heel_height status array with false values
  initializeHeelHeightActiveStatusArray() {
    this.heelHeighActiveStatusArray = Array(this.heelHeightArr.length).fill(
      false
    );
    this.heelHeighActiveStatusListener.next(this.heelHeighActiveStatusArray);
  }

  // Fills the sales status array with false values
  initializeSalesActiveStatusArray() {
    this.salesActiveStatusArray = Array(this.salesArr.length).fill(false);
    this.salesActiveStatusListener.next(this.salesActiveStatusArray);
  }

  // Fills the material status array with false values
  initializeMaterialActiveStatusArray() {
    this.materialActiveStatusArray = Array(this.materialArr.length).fill(false);
    this.materialActiveStatusListener.next(this.materialActiveStatusArray);
  }
  /**
   * Used from inside the contentListCompnent and from outside. In the
   * first case only the index is provided, thus the active status array is
   * updated and the app is informed. In the second case the index is searched
   * from the chipValue that is provided. In this case the index provided is null.
   * @param index the index of the value to be updated
   * @param chipValue optional. The value of the chip, to be used in the
   * getArrayIndex function to get the index of the item to be updated
   */
  onUpdateHeelHeighActiveStatusArray(index: number | null, chipValue?: string) {
    //   calling from search component and from different component than content-list
    if (!index && chipValue) {
      index = this.appService.getArrayIndex(chipValue, this.heelHeightArr);
    }
    // fill the array with false value
    this.initializeHeelHeightActiveStatusArray();
    // set true to the provided index
    if (index != null) {
      this.heelHeighActiveStatusArray[index] = true;
    }
    // inform the app about the change
    this.heelHeighActiveStatusListener.next(this.heelHeighActiveStatusArray);
  }
  /**
   * Used from inside the contentListCompnent and from outside. In the
   * first case only the index is provided, thus the active status array is
   * updated and the app is informed. In the second case the index is searched
   * from the chipValue that is provided. In this case the index provided is null.
   * @param index the index of the value to be updated
   * @param chipValue optional. The value of the chip, to be used in the
   * getArrayIndex function to get the index of the item to be updated
   */
  onUpdateSalesActiveStatusArray(index: number | null, chipValue?: string) {
    //   calling from search component and from different component than content-list
    if (!index && chipValue) {
      index = this.appService.getArrayIndex(chipValue, this.salesArr);
    }
    // fill the array with false value
    this.initializeSalesActiveStatusArray();
    // set true to the provided index
    if (index) {
      this.salesActiveStatusArray[index] = true;
    }
    // inform the app about the change
    this.salesActiveStatusListener.next(this.salesActiveStatusArray);
  }

  /**
   * Used from inside the contentListCompnent and from outside. In the
   * first case only the index is provided, thus the active status array is
   * updated and the app is informed. In the second case the index is searched
   * from the chipValue that is provided. In this case the index provided is null.
   * @param index the index of the value to be updated
   * @param chipValue optional. The value of the chip, to be used in the
   * getArrayIndex function to get the index of the item to be updated
   */
  onUpdateMaterialActiveStatusArray(index: number | null, chipValue?: string) {
    //   calling from search component and from different component than content-list
    if (!index && chipValue) {
      index = this.appService.getArrayIndex(chipValue, this.materialArr);
    }
    // fill the array with false value
    this.initializeMaterialActiveStatusArray();
    // set true to the provided index
    if (index) {
      this.materialActiveStatusArray[index] = true;
    }
    // inform the app about the change
    this.materialActiveStatusListener.next(this.materialActiveStatusArray);
  }
}
