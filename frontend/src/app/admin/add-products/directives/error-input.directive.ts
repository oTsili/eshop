import {
  Directive,
  HostBinding,
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
  selector: '[error-input]',
})
export class ErrorInputDirective implements OnInit, OnChanges, OnDestroy {
  element: HTMLElement;
  @Input() form: FormGroup;
  @Input() controlName: string;
  count = 0;
  submitProductFormSubscription: Subscription;
  submitSupplierFormSubscription: Subscription;
  isProductFormSubmitted = false;
  isSupplierFormSubmitted = false;

  constructor(
    private productFormService: ProductFormService,
    private supplierService: AddSupplierService
  ) {}

  ngOnInit(): void {
    this.submitProductFormSubscription = this.productFormService
      .getProductFormSubmitListener()
      .subscribe({
        next: (response) => {
          this.isProductFormSubmitted = response;
        },
      });
    this.submitSupplierFormSubscription = this.supplierService
      .getSupplierFormSubmitListener()
      .subscribe({
        next: (response) => {
          this.isSupplierFormSubmitted = response;
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

  @HostBinding('class.error')
  get checkError() {
    if (this.controlName && this.form.get(this.controlName)) {
      return (
        (this.form.get(this.controlName)?.invalid &&
          this.form.get(this.controlName)?.touched) ||
        (this.form.get(this.controlName)?.invalid &&
          this.isProductFormSubmitted)
      );
    } else {
      return null;
    }
  }
}
