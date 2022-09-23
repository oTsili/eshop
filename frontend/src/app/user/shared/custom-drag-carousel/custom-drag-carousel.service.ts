import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + '/product/sales';

@Injectable({
  providedIn: 'root',
})
export class CustomDragCarouselService {
  constructor(private http: HttpClient) {}

  getCarouselSlides() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }
}
