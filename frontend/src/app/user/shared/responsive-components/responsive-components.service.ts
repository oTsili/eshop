import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + '/grid-categories';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveComponentsService {
  constructor(private http: HttpClient) {}

  getResponsiveComponents() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }
}
