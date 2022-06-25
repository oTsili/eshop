import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  /**
   *get the string for css-property grid-template-areas or gdAreas(in flexLayout library)
   * @param mumOfCols the number of grid area columns
   * @param arr the array  of the grid contents
   * @returns a string to use as value in css-property grid-template-areas or gdAreas(in flexLayout library)
   */
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
