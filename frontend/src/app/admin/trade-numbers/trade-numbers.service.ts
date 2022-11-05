import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../supplier/supplier.interfaces';
import { TableRowItem } from './category/table-row/table-row.class';
import { TableRowComponent } from './category/table-row/table-row.component';
import { TradeNumber, TradeNumbers } from './trade-numbers.interfaces';

const BACKEND_URL = environment.BASE_URL + '/product';
const BACKEND_SUPPLIER_URL = environment.BASE_URL + '/supplier';

@Injectable({
  providedIn: 'root',
})
export class TradeNumbersService {
  constructor(private httpClient: HttpClient) {}

  getTradeNumbers() {
    return this.httpClient.get<TradeNumbers>(`${BACKEND_URL}/trade-number`, {
      withCredentials: true,
    });
  }
    getSuppliers(){
    return this.httpClient.get<Supplier[]>( `${BACKEND_SUPPLIER_URL}`,{withCredentials:true})
  }

  getTableRow(category_style) {
    // console.log({ category_style });
    return new TableRowItem(TableRowComponent, { category_style });
  }
}
