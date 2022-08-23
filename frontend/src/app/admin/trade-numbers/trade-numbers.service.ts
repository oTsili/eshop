import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TableRowItem } from './table-row/table-row.class';
import { TableRowComponent } from './table-row/table-row.component';

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

  getTableRow(category, category_style) {
    // console.log({ category_style });
    return new TableRowItem(TableRowComponent, { category, category_style });
  }
}
