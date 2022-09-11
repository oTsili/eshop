import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TradeNumber } from '../../trade-numbers.interfaces';

const BACKEND_URL = environment.BASE_URL + '/product';

@Injectable({ providedIn: 'root' })
export class TableRowService {
  constructor(private httpClient: HttpClient) {}

  deleteRow(id: string, category: string) {
    return this.httpClient.delete(
      `${BACKEND_URL}/trade-number/${id}/${category}`,
      {
        withCredentials: true,
      }
    );
  }

  updateRow(id: string, category: string, description: string, code: string) {
    const row = { description, code };

    return this.httpClient.put<{ directoryUpdated: TradeNumber }>(
      `${BACKEND_URL}/trade-number/${id}/${category}`,
      row,
      {
        withCredentials: true,
      }
    );
  }

  createRow(category: string, description: string, code: string) {
    const row = { description, code };

    return this.httpClient.post<{ directoriesSaved: TradeNumber }>(
      `${BACKEND_URL}/trade-number/${category}`,
      row,
      {
        withCredentials: true,
      }
    );
  }
}
