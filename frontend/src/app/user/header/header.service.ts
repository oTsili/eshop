import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { navBarElement } from './header.interfaces';

const BACKEND_URL = environment.BASE_URL + 'navbar';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  constructor(private http: HttpClient) {}

  getNavBarElements() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }
}
