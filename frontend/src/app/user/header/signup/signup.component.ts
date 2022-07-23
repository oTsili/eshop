import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { imgMimeType } from '../../shared/validators/img-mime-type-validator';
import { RetypeConfirm } from '../../shared/validators/password-confirm-validator';
import { SignupAuthData } from './signup.interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  theSignupForm: FormGroup;
  signupDate: string;
  constructor() {}

  ngOnInit(): void {
    this.theSignupForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      firstName: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required],
      }),
      // photoPath: new FormControl(null, {
      //   // validators: [Validators.required],
      //   asyncValidators: [imgMimeType],
      // }),
      passwordsForm: new FormGroup({
        password: new FormControl(null, {
          validators: [Validators.required],
        }),
        passwordConfirm: new FormControl(null, {
          validators: [Validators.required, RetypeConfirm('password')],
        }),
      }),
    });
  }

  onSignup(form: FormGroup) {
    if (form.invalid) {
      console.log('invalid form');
      return;
    }

    // get the current date
    var m = new Date();
    var dateString = `${m.getUTCFullYear()}/${
      m.getUTCMonth() + 1
    }/${m.getUTCDate()} ${String(
      m.getUTCHours() + 2
    )}:${m.getUTCMinutes()}:${m.getUTCSeconds()}`;

    this.signupDate = dateString;

    this.isLoading = true;

    const user: SignupAuthData = {
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      // file: form.value.photoPath,
      signupDate: this.signupDate,
      password: form.value.passwordsForm.password,
      passwordConfirm: form.value.passwordsForm.passwordConfirm,
    };

    // this.authService.createUser(user);

    this.isLoading = false;
  }
}
