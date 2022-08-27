import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Supplier } from '../supplier.interfaces';
import { AddSupplierService } from './add-supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  isLoading = false;
  suppliers;
  sumbitDate: string;

  constructor(
    private addSupplierService: AddSupplierService,
    private appService: AppService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.supplierForm = new FormGroup({
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
    });
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
    console.log(this.sumbitDate);

    this.isLoading = true;

    const {
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

    console.log({ supplier });

    this.addSupplierService.submitSupplierForm(supplier).subscribe({
      next: (response) => {
        console.log(response);
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
      (this.supplierForm.get('firstname')!.invalid &&
        this.supplierForm.get('firstname')!.touched) ||
      (this.supplierForm.get('lastname')!.invalid &&
        this.supplierForm.get('lastname')!.touched)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
