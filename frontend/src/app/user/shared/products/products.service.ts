import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + 'products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  updateListener = new Subject<{ query: string }>();

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }

  getProductsUpdateListener() {
    return this.updateListener.asObservable();
  }

  onProductsUpdate(query: string) {
    console.log(query);
    this.updateListener.next({
      query,
    });
  }

  updateColor(query: string) {
    let url = `${BACKEND_URL}/query?${query}`;
    return this.http.get<any>(url, {
      withCredentials: true,
    });
  }
}
