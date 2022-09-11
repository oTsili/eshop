import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../../supplier.interfaces';

const BACKEND_URL = environment.BASE_URL + '/supplier';

@Injectable({ providedIn: 'root' })
export class SuppliersRowService {
  constructor(private httpClient: HttpClient) {}

  deleteRow(id: string) {
    return this.httpClient.delete(`${BACKEND_URL}/${id}`, {
      withCredentials: true,
    });
  }

  updateRow(id: string, supplier: Supplier) {
    return this.httpClient.put(`${BACKEND_URL}/${id}`, supplier, {
      withCredentials: true,
    });
  }
}
