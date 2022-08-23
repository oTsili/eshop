import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class AddProductsService {
  private colorsArrayListener = new BehaviorSubject<string[]>([]);
  private colorsArr: string[] = [];

  constructor(private appService: AppService) {}

  getColorsArrayListener() {
    return this.colorsArrayListener.asObservable();
  }

  updateColorsArray() {
    this.colorsArrayListener.next(this.colorsArr);
  }

  pushColorsArray(value: string) {
    this.colorsArr.push(value);
    this.updateColorsArray();
  }

  getColorsArray() {
    return this.colorsArr;
  }

  spliceColorsArray(value: string) {
    const index = this.appService.getArrayIndex(value, this.colorsArr);
    this.colorsArr.splice(index, 1);
    this.updateColorsArray();
  }
}
