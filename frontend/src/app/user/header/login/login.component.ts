import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { Subscription } from 'rxjs';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  userIsAuthenticated = false;

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    // get translate language and subscribe
    const selectedLanguage = this.headerService.selectedLanguage;
    this.translate.use(selectedLanguage);
  }

  ngOnDestroy(): void {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      console.log('form invalid');
      return;
    }
    this.isLoading = true;
    // this.authService.login(form.value.email, form.value.password);
    this.isLoading = false;
  }
}
