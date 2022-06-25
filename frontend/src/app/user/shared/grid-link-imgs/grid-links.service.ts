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
}
