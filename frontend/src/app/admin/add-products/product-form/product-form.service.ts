import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadProduct } from './upload-product.interfaces';

const BACKEND_URL = environment.BASE_URL + 'product';

@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  constructor(private httpClient: HttpClient) {}

  submitProductForm(product: UploadProduct) {
    const productData = new FormData();
    // productData.append('name', product.name);
    // productData.append('images', product.images);
    // productData.append('colors', product.colors);
    // productData.append('sizes', product.sizes);
    productData.append('material', product.material);
    productData.append('price', product.price);
    productData.append('sales', product.sales);
    productData.append('heel_heigh', product.heel_heigh);
    productData.append('description', product.description);

    return this.httpClient.post<UploadProduct>(
      `${BACKEND_URL}/upload`,
      productData,
      { withCredentials: true }
    );
  }
}
