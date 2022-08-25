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
    productData.append('src', product.src);
    productData.append('altSrc', product.altSrc);
    productData.append('name', product.name);
    for (let color of product.colors) productData.append('colors', color);
    productData.append('size', product.size);
    productData.append('price', product.price);
    productData.append('material', product.material);
    productData.append('sales', product.sales);
    productData.append('heel_heigh', product.heel_height);
    productData.append('season', product.season);
    productData.append('style', product.style);
    productData.append('type', product.type);
    productData.append('description', product.description);
    for (let image of product.images) productData.append('photo[]', image);

    return this.httpClient.post<UploadProduct>(`${BACKEND_URL}`, productData, {
      withCredentials: true,
    });
  }
}
