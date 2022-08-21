import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + 'product';

@Injectable({
  providedIn: 'root',
})
export class TradeNumbersService {
  constructor(private httpClient: HttpClient) {}

  getTradeNumbers() {
    return this.httpClient.get(`${BACKEND_URL}/trade-number`, {
      withCredentials: true,
    });
  }
}
