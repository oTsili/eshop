import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../shared/responsive-catalog/container/item/item';
import { ProductComponent } from './product/product.component';

const BACKEND_URL = environment.BASE_URL + 'products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(`${BACKEND_URL}`, {
      withCredentials: true,
    });
  }

  getProductComponents() {
    return [
      new Item(ProductComponent, {
        name: 'Bombasto',
        bio: 'Brave as they come',
      }),
      new Item(ProductComponent, {
        name: 'Dr IQ',
        bio: 'Smart as they come',
      }),
      new Item(ProductComponent, {
        headline: 'Hiring for several positions',
        body: 'Submit your resume today!',
      }),
      new Item(ProductComponent, {
        headline: 'Openings in all departments',
        body: 'Apply today',
      }),
    ];
  }
}
