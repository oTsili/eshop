import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + 'footer';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  constructor(private httpClient: HttpClient) {}

  getLinks() {
    return this.httpClient.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }
}
