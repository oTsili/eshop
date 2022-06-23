import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  getGridAreas(mumOfCols: number, arr: any[]) {
    // console.log(colNum);
    let areas = '';
    for (let [index, category] of arr.entries()) {
      if (mumOfCols === arr.length && index === 0) {
        areas = areas + `area${index} |`;
      } else if (index === 0) {
        areas = areas + `area${index} `;
      } else if (index === arr.length - 1) {
        areas = areas + `area${index}`;
      } else if (index % mumOfCols !== 0) {
        areas = areas + `area${index} |`;
      } else {
        areas = areas + ` area${index} `;
      }
    }

    // console.log(areas);
    return areas;
  }
}
