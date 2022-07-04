import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + 'footer';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  constructor(private http: HttpClient) {}

  getLinks() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }
}
