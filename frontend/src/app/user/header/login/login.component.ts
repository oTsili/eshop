import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header.service';
import { LoginService } from './login.service';
import { AuthService } from '../../auth/auth.service';
import { UserAppService } from '../../user-app.service';
import { AppService } from 'src/app/app.service';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  userIsAuthenticated = false;
  submitSubscription: Subscription;
  loginSubscription: Subscription;
  translateSubscription: Subscription;
  theLoginForm: FormGroup;
  isErrorMessageOpen = false;
  errorMessage: string;
  @ViewChild('submitButton') submitButton;

  constructor(
    private translate: TranslateService,
    private loginService: LoginService,
    private authService: AuthService,
    private appService: AppService,
    private userAppService: UserAppService,
    private accountService: AccountService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    this.submitSubscription = this.loginService
      .getSubmitListener()
      .subscribe((response) => {
        // console.log(this.signupForm.nativeElement);
        // this.signupForm.nativeElement.submit();
        this.submitButton.nativeElement.click();
      });

    this.theLoginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    // get translate language and subscribe
    const selectedLanguage = this.appService.selectedLanguage;
    this.translate.use(selectedLanguage);
  }

  ngOnDestroy(): void {
    this.submitSubscription.unsubscribe();
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }

  toggleMessage() {
    this.isErrorMessageOpen = !this.isErrorMessageOpen;
  }

  onLogin(form: FormGroup) {
    if (form.invalid) {
      console.log('form invalid');
      return;
    }
    this.isLoading = true;
    this.loginSubscription = this.authService
      .login(form.value.email, form.value.password)
      .subscribe({
        next: (response) => {
          // console.log({ response });
          this.userAppService.onToggleModal();
          // this.accountService.localUser = response.existingUser;
          // localStorage.setItem('user', JSON.stringify(response));
        },
        error: (error) => {
          // console.log(error);
          let errorMessage = error.error.message;
          // .split(':')[1].trim();
          console.log(errorMessage);

          this.translateSubscription = this.translate
            .get(errorMessage)
            .subscribe((translation) => {
              errorMessage = translation;
              console.log(errorMessage);
              this.errorMessage = errorMessage;
              this.toggleMessage();
            });
        },
      });
    this.isLoading = false;
  }
}
