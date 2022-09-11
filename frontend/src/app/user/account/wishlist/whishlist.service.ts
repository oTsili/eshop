import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + '/whishlist';

@Injectable({ providedIn: 'root' })
export class WhishlistService {
  constructor(private httpClient: HttpClient) {}

  deleteWhishlistItem(id: string) {
    return this.httpClient.delete(`${BACKEND_URL}/${id}`, {
      withCredentials: true,
    });
  }
}
