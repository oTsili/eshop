import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + '/cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private httpClient: HttpClient) {}

  deleteCartItem(id: string) {
    return this.httpClient.delete(`${BACKEND_URL}/${id}`, {
      withCredentials: true,
    });
  }

  getCartItem(id: string) {
    return this.httpClient.get(`${BACKEND_URL}/${id}`, {
      withCredentials: true,
    });
  }
}
