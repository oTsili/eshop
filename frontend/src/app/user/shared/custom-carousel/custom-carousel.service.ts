import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Slide } from './custom-carousel.interface';

const BACKEND_URL = environment.CAROUSEL_SLIDES_BASE_URL + 'carousel-slides';

@Injectable({
  providedIn: 'root',
})
export class CustomCarouselService {
  constructor(private http: HttpClient) {}

  getCarouselSlides() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }
}
