import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../my-error-state-matcher';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() inputElement: {
    label: string;
    type: string;
    placeholder: string;
  };
  constructor() {}
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.control.hasError('required')) {
      return 'You must enter a value';
    } else if (this.control.hasError('email')) {
      return 'Not a valid email';
    } else if (this.control.hasError('minlength')) {
      return `${this.control.errors?.['minlength'].actualLength}
        characters long, but it must be at least
        ${this.control.errors?.['minlength'].requiredLength}
        characters`;
    } else if (this.control.hasError('maxlength')) {
      return `${this.control.errors?.['maxlength'].actualLength}
        characters long, but it must be at least
        ${this.control.errors?.['maxlength'].requiredLength}
        characters`;
    } else if (this.control.hasError('pattern')) {
      return 'Invalid format';
    } else {
      return '';
    }

    // return this.control.hasError('required')
    //   ? 'You must enter a value'
    //   : this.control.hasError('email')
    //   ? 'Not a valid email'
    //   : this.control.hasError('minlength')
    //   ? `${this.control.errors?.['minlength'].actualLength}
    //   characters long, but it must be at least
    //   ${this.control.errors?.['minlength'].requiredLength}
    //   characters`
    //   : this.control.hasError('maxlength')
    //   ? `${this.control.errors?.['maxlength'].actualLength}
    //   characters long, but it must be at least
    //   ${this.control.errors?.['maxlength'].requiredLength}
    //   characters`
    //   : this.control.hasError('pattern')
    //   ? 'Invalid format'
    //   : '';
  }
}
