import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductFormService } from '../product-form/product-form.service';

@Directive({
  selector: '[error-select]',
})
export class ErrorSelectDirective implements OnInit, OnChanges {
  @Input() form: FormGroup;
  @Input() controlName: string;
  count = 0;
  submitFormSubscription: Subscription;
  isFormSubmitted = false;

  constructor(private productFormService: ProductFormService) {}

  ngOnInit(): void {
    this.submitFormSubscription = this.productFormService
      .getFormSubmitListener()
      .subscribe({
        next: (response) => {
          this.isFormSubmitted = response;
        },
      });
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
