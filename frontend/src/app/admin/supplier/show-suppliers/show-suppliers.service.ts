import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../supplier.interfaces';

const BASE_URL = environment.BASE_URL + 'supplier';

@Injectable({ providedIn: 'root' })
export class ShowSuppliersService {
  constructor(private httpClient: HttpClient) {}

  getSuppliers() {
    return this.httpClient.get<{ suppliers: Supplier[] }>(BASE_URL, {
      withCredentials: true,
    });
  }
}
