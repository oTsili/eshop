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

@Directive({
  selector: '[error-input]',
})
export class ErrorInputDirective implements OnInit, OnChanges {
  element: HTMLElement;
  @Input() form: FormGroup;
  @Input() controlName: string;
  count = 0;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']) this.form = changes['form'].currentValue;

    if (changes['controlName'])
      this.controlName = changes['controlName'].currentValue;
  }

  @HostBinding('class.error')
  get checkError() {
    if (this.controlName && this.form.get(this.controlName)) {
      return (
        this.form.get(this.controlName)?.invalid &&
        this.form.get(this.controlName)?.touched
      );
    } else {
      return null;
    }
  }
}
