import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResponsiveCatalogService {
  private nOfCols: number;
  private productWidthListener = new Subject<number>();

  set numOfCols(numberOfCols: number) {
    this.nOfCols = numberOfCols;
  }

  get numOfCols() {
    return this.nOfCols;
  }

  getProductWidthListener() {
    return this.productWidthListener.asObservable();
  }

  productWidthUpdate(width: number) {
    this.productWidthListener.next(width);
  }
}
