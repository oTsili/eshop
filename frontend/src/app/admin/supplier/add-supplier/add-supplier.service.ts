import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../supplier.interfaces';

const BACKEND_URL = environment.BASE_URL + 'supplier';

@Injectable({
  providedIn: 'root',
})
export class AddSupplierService {
  private formListener = new Subject<FormGroup>();
  private formSubmitListener = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getSupplierFormSubmitListener() {
    return this.formSubmitListener.asObservable();
  }

  supplierFormSubmitted(isSubmitted) {
    this.formSubmitListener.next(isSubmitted);
  }

  getSupplierFormListener() {
    return this.formListener.asObservable();
  }

  submitSupplierForm(supplier: Supplier) {
    const supplierData = new FormData();
    supplierData.append('firstname', supplier.firstname);
    supplierData.append('lastname', supplier.lastname);
    supplierData.append('tax_id_number', supplier.tax_id_number);
    supplierData.append('phone', supplier.phone);
    supplierData.append('address', supplier.address);
    supplierData.append('city', supplier.city);
    supplierData.append('country', supplier.country);
    supplierData.append('id', supplier.id);
    supplierData.append('photo', supplier.photo);

    console.log(supplierData.entries());

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

    return this.httpClient.post<Supplier>(
      `${BACKEND_URL}`,
      supplierData,
      options
    );
  }
}
