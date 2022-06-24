import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + 'grid-categories';

@Injectable({
  providedIn: 'root',
})
export class GridLinksImgsService {
  constructor(private http: HttpClient) {}

  getGridCategories() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }

  getGridAreas(mumOfCols: number, arr: any[]) {
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
