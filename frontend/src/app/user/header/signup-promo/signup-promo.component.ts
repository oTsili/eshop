import { Component, OnInit } from '@angular/core';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup-promo',
  templateUrl: './signup-promo.component.html',
  styleUrls: ['./signup-promo.component.scss'],
})
export class SignupPromoComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {}
}
