import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { navBarElement } from './header.interfaces';

const BACKEND_URL = environment.BASE_URL + 'navbar';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  constructor(private http: HttpClient) {}

  getNavBarElements() {
    return this.http
      .get<any>(`${BACKEND_URL}`, {
        withCredentials: true,
      })
      .pipe(
        map((data) => {
          return { navBarElement: this.sortArr(data.navBarElement) };
        })
      );
  }

  sortArr(array: navBarElement[]) {
    array.sort((a, b) => {
      return a.position! - b.position!;
    });

    return array;
  }
}
