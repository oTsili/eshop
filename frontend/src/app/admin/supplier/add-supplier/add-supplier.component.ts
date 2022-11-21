import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Supplier } from '../supplier.interfaces';
import { AddSupplierService } from './add-supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit, OnDestroy {
  supplierForm: FormGroup;
  isLoading = false;
  suppliers;
  sumbitDate: string;
  supplierFormSubscription: Subscription;
  fileSubscription: Subscription;

  constructor(
    private addSupplierService: AddSupplierService,
    private appService: AppService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.supplierFormSubscription = this.addSupplierService
      .getSupplierFormListener()
      .subscribe({
        next: (response) => {
          if (response) this.supplierForm = response;
          // console.log(response);
        },
      });

    this.fileSubscription = this.addSupplierService
      .getFileListener()
      .subscribe({
        next: (response) => {
          if (response) this.supplierForm.get('photo')?.patchValue(response);
        },
      });

    this.supplierForm = new FormGroup({
      company_name: new FormControl(null, {
        validators: [Validators.required],
      }),
      firstname: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required],
      }),
      tax_id_number: new FormControl(null, {
        validators: [Validators.required],
      }),
      phone: new FormControl(null, {
        validators: [Validators.required],
      }),
      address: new FormControl(null, {
        validators: [Validators.required],
      }),
      city: new FormControl(null, {
        validators: [Validators.required],
      }),
      country: new FormControl(null, {
        validators: [Validators.required],
      }),
      id: new FormControl(null, {
        validators: [Validators.required],
      }),
      photo: new FormControl(null, {
        // validators: [Validators.required],
      }),
    });

    // update single files with the form
    this.addSupplierService.updateSupplierForm(this.supplierForm);
  }

  ngOnDestroy(): void {
    this.supplierFormSubscription.unsubscribe();
    this.fileSubscription.unsubscribe();
  }

  onSubmit(form: FormGroup) {
    this.addSupplierService.supplierFormSubmitted(true);

    // initialize the form without the error class
    const formElement = this.elementRef.nativeElement.querySelector('.form');
    this.renderer.removeClass(formElement, 'error');

    if (form.invalid) {
      console.log('invalid form');
      this.renderer.addClass(formElement, 'error');
      return;
    }

    this.sumbitDate = this.appService.getDateString();
    // console.log(this.sumbitDate);

    this.isLoading = true;

    const {
      company_name,
      firstname,
      lastname,
      tax_id_number,
      phone,
      address,
      city,
      country,
      id,
      photo,
    }: Supplier = {
      ...form.value,
    };

    const supplier: Supplier = {
      company_name,
      firstname,
      lastname,
      tax_id_number,
      phone,
      address,
      city,
      country,
      id,
      photo,
    };

    // console.log({ supplier });

    this.addSupplierService.submitSupplierForm(supplier).subscribe({
      next: (response) => {
        // console.log(response);
      },
    });

    this.isLoading = false;
  }

  closeErrorMessage() {
    // unred the fields
    this.addSupplierService.supplierFormSubmitted(false);

    // unred the form
    const formElement = this.elementRef.nativeElement.querySelector('.form');
    this.renderer.removeClass(formElement, 'error');
  }

  checkFormErrors() {
    if (
      (this.supplierForm.get('company_name')!.invalid &&
        this.supplierForm.get('company_name')!.touched) ||
      (this.supplierForm.get('firstname')!.invalid &&
        this.supplierForm.get('firstname')!.touched) ||
      (this.supplierForm.get('lastname')!.invalid &&
        this.supplierForm.get('lastname')!.touched) ||
      (this.supplierForm.get('tax_id_number')!.invalid &&
        this.supplierForm.get('tax_id_number')!.touched) ||
      (this.supplierForm.get('phone')!.invalid &&
        this.supplierForm.get('phone')!.touched) ||
      (this.supplierForm.get('address')!.invalid &&
        this.supplierForm.get('address')!.touched) ||
      (this.supplierForm.get('city')!.invalid &&
        this.supplierForm.get('city')!.touched) ||
      (this.supplierForm.get('country')!.invalid &&
        this.supplierForm.get('country')!.touched) ||
      (this.supplierForm.get('id')!.invalid &&
        this.supplierForm.get('id')!.touched)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
