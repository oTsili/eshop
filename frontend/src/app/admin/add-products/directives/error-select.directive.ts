import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddSupplierService } from '../../supplier/add-supplier/add-supplier.service';
import { ProductFormService } from '../product-form/product-form.service';

@Directive({
  selector: '[error-select]',
})
export class ErrorSelectDirective implements OnInit, OnChanges, OnDestroy {
  @Input() form: FormGroup;
  @Input() controlName: string;
  count = 0;
  submitProductFormSubscription: Subscription;
  submitSupplierFormSubscription: Subscription;
  isFormSubmitted = false;
  // isSupplierFormSubmitted = false;

  constructor(
    private productFormService: ProductFormService,
    private supplierService: AddSupplierService
  ) {}

  ngOnInit(): void {
    this.submitProductFormSubscription = this.productFormService
      .getProductFormSubmitListener()
      .subscribe({
        next: (response) => {
          this.isFormSubmitted = response;
        },
      });
    this.submitSupplierFormSubscription = this.supplierService
      .getSupplierFormSubmitListener()
      .subscribe({
        next: (response) => {
          this.isFormSubmitted = response;
        },
      });
  }
  ngOnDestroy(): void {
    this.submitProductFormSubscription.unsubscribe();
    this.submitSupplierFormSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']) this.form = changes['form'].currentValue;

    if (changes['controlName'])
      this.controlName = changes['controlName'].currentValue;
  }

  @HostListener('click', ['$event'])
  activateTouched() {
    console.log(this.form.get(this.controlName)?.value);
    this.form.get(this.controlName)?.markAsTouched();
    if (
      this.count > 0 &&
      (!this.form.get(this.controlName)?.value ||
        this.form.get(this.controlName)?.value.length === 0)
    ) {
      this.form.get(this.controlName)?.markAsDirty();
    }
    this.count++;
  }

  @HostBinding('class.error')
  get checkError() {
    if (this.controlName && this.form.get(this.controlName)) {
      return (
        (this.form.get(this.controlName)?.invalid &&
          this.form.get(this.controlName)?.touched &&
          this.form.get(this.controlName)?.dirty) ||
        (this.form.get(this.controlName)?.invalid && this.isFormSubmitted)
      );
    } else {
      return null;
    }
  }
}
