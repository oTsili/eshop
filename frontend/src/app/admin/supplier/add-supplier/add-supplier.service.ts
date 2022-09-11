import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../supplier.interfaces';

const BACKEND_URL = environment.BASE_URL + '/supplier';

@Injectable({
  providedIn: 'root',
})
export class AddSupplierService {
  private supplierFormListener = new BehaviorSubject<FormGroup | null>(null);
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
    return this.supplierFormListener.asObservable();
  }

  updateSupplierForm(form) {
    this.supplierFormListener.next(form);
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

  deleteFile() {
    this.fileListener.next(null);
  }

  submitSupplierForm(supplier: Supplier) {
    const supplierData = new FormData();
    supplierData.append('company_name', supplier.company_name);
    supplierData.append('firstname', supplier.firstname);
    supplierData.append('lastname', supplier.lastname);
    supplierData.append('tax_id_number', supplier.tax_id_number);
    supplierData.append('phone', supplier.phone);
    supplierData.append('address', supplier.address);
    supplierData.append('city', supplier.city);
    supplierData.append('country', supplier.country);
    supplierData.append('id', supplier.id);
    if (supplier.photo) supplierData.append('photo', supplier.photo);

    console.log(supplierData.entries());

    return this.httpClient.post<Supplier>(
      `${BACKEND_URL}`,
      supplierData,
      // options
      { withCredentials: true }
    );
  }
}
