import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductFormService } from '../product-form/product-form.service';

@Directive({
  selector: '[error-input]',
})
export class ErrorInputDirective implements OnInit, OnChanges, OnDestroy {
  element: HTMLElement;
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
  ngOnDestroy(): void {
    this.submitFormSubscription.unsubscribe();
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
        (this.form.get(this.controlName)?.invalid && this.isFormSubmitted)
      );
    } else {
      return null;
    }
  }
}
