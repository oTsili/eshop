import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemClass } from '../shared/NOT-USED-responsive-catalog/container/item/item';
import { Product } from './products.interface';
import { ProductComponent } from './wrapper/product/product.component';
import { WrapperComponent } from './wrapper/wrapper.component';

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

  getProductComponents(products: Product[]) {
    return [
      new ItemClass(WrapperComponent, {
        products: products,
        index: 0,
      }),
      new ItemClass(WrapperComponent, {
        products: products,
        index: 1,
      }),
      new ItemClass(WrapperComponent, {
        products: products,
        index: 2,
      }),
      new ItemClass(WrapperComponent, {
        products: products,
        index: 3,
      }),
      new ItemClass(WrapperComponent, {
        products: products,
        index: 4,
      }),
      new ItemClass(WrapperComponent, {
        products: products,
        index: 5,
      }),
    ];
  }
}
