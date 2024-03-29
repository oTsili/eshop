import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { imgMimeType } from '../../shared/validators/img-mime-type-validator';
import { RetypeConfirm } from '../../shared/validators/password-confirm-validator';
import { SignupAuthData } from './signup.interfaces';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header.service';
import { SignupService } from './signup.service';
import { AuthService } from '../../auth/auth.service';
import { UserAppService } from '../../user-app.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  theSignupForm: FormGroup;
  signupDate: string;
  submitSubscription: Subscription;
  signupSubscription: Subscription;
  @ViewChild('submitButton') submitButton;

  constructor(
    private translate: TranslateService,
    private signupService: SignupService,
    private authService: AuthService,
    private appService: AppService,
    private userAppService: UserAppService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    this.submitSubscription = this.signupService
      .getSubmitListener()
      .subscribe((response) => {
        // console.log(this.signupForm.nativeElement);
        // this.signupForm.nativeElement.submit();
        this.submitButton.nativeElement.click();
      });

    // get translate language and subscribe
    const selectedLanguage = this.appService.selectedLanguage;
    this.translate.use(selectedLanguage);

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

  ngOnDestroy(): void {
    this.submitSubscription.unsubscribe();
    if (this.signupSubscription) {
      this.signupSubscription.unsubscribe();
    }
  }

  onSignup(form: FormGroup) {
    if (form.invalid) {
      console.log('invalid form');
      return;
    }

    this.signupDate = this.appService.getDateString();
    // console.log(this.signupDate);

    this.isLoading = true;

    const user: SignupAuthData = {
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      signupDate: this.signupDate,
      password: form.value.passwordsForm.password,
      passwordConfirm: form.value.passwordsForm.passwordConfirm,
    };

    this.signupSubscription = this.authService.signup(user).subscribe(
      {
        next: (c) => {
          // console.log(c);
          this.userAppService.onToggleModal();
        },
      }
      // (data) => {
      //   this.router.navigate(['/']);
      //   let duration = parseInt(data.expiresIn);
      //   this.setAuthTimer(duration);
      //   const now = new Date();
      //   const expirationDate = new Date(now.getTime() + duration * 1000);
      //   this.saveToStorage(expirationDate);
      // },
      // (error) => {
      //   this.authStatusListener.next(false);
      // }
    );

    this.isLoading = false;
  }
}
