import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadProduct } from './upload-product.interfaces';

const BACKEND_URL = environment.BASE_URL + 'product';

@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  private formListener = new Subject<FormGroup>();
  private formSubmitListener = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getFormSubmitListener() {
    return this.formSubmitListener.asObservable();
  }

  formSubmitted(isSubmitted) {
    this.formSubmitListener.next(isSubmitted);
  }

  getFormListener() {
    return this.formListener.asObservable();
  }

  updateForm(form) {
    this.formListener.next(form);
  }

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
    productData.append('heel_height', product.heel_height);
    productData.append('season', product.season);
    productData.append('style', product.style);
    productData.append('type', product.type);
    productData.append('description', product.description);
    for (let image of product.images) productData.append('photo[]', image);

    console.log(productData.entries());

    let headers = new HttpHeaders();
    // headers = headers.append('Content-Type', 'multipart/form-data');
    // headers = headers.append('enctype', 'multipart/form-data');
    // headers = headers.append(
    //   'Content-Type',
    //   'application/x-www-form-urlencoded'
    // );
    // headers = headers.append('enctype', 'application/x-www-form-urlencoded');
    // headers = headers.append('Accept', 'application/json');

    // console.log({ headers });

    let params = new HttpParams();
    params = params.append('reportProgress', true);
    params = params.append('withCredentials', true);

    const options = {
      headers,
      params,
    };

    return this.httpClient.post<UploadProduct>(
      `${BACKEND_URL}`,
      productData,
      options
    );
  }
}
