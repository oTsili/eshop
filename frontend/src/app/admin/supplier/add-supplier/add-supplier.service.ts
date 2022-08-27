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
  private fileListener = new BehaviorSubject<File | null>(null);
  private file: File;

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

  updateForm(form) {
    this.formListener.next(form);
  }

  getFileListener() {
    return this.fileListener.asObservable();
  }

  updateFile() {
    this.fileListener.next(this.file);
  }

  setFile(file: File) {
    this.file = file;
    this.updateFile();
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

    return this.httpClient.post<Supplier>(
      `${BACKEND_URL}`,
      supplierData,
      // options
      { withCredentials: true }
    );
  }
}
