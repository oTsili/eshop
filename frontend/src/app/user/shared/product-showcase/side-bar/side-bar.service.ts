import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/user/product/product.interface';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.BASE_URL + '/product';

@Injectable({ providedIn: 'root' })
export class SideBarService {
  constructor(private httpClient: HttpClient) {}

  getSimilarProducts() {
    return this.httpClient.get<{
      message: string;
      products: Product[];
      totalProducts: number;
    }>(`${BASE_URL}/all`, {
      withCredentials: true,
    });
  }
}
