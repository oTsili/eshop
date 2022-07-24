import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';

@Component({
  selector: 'app-login-promo',
  templateUrl: './login-promo.component.html',
  styleUrls: ['./login-promo.component.scss'],
})
export class LoginPromoComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {}
}
