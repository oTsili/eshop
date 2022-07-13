import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  /**
   *get the string for css-property grid-template-areas or gdAreas(in flexLayout library)
   * @param numOfCols the number of grid area columns
   * @param arr the array  of the grid contents
   * @returns a string to use as value in css-property grid-template-areas or gdAreas(in flexLayout library)
   */
  getGridAreas(numOfCols: number, arr: any[]) {
    // console.log(colNum);
    let areas = '';
    for (let [index, item] of arr.entries()) {
      let idx = index + 1;
      if (numOfCols === arr.length) {
        if (idx === arr.length - 1) {
          areas = areas + `area${idx}`;
        } else {
          areas = areas + `area${idx} |`;
        }
      } else {
        if (idx % numOfCols === 0 && idx !== 0 && idx !== arr.length) {
          areas = areas + `area${idx} |`;
        } else {
          areas = areas + ` area${idx} `;
        }
      }
    }

    console.log(areas);
    return areas;
  }
}
