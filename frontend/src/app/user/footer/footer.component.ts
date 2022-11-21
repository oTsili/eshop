import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { FooterContent } from './footer.interface';
import { FooterService } from './footer.service';
import defaultLanguage from 'src/assets/i18n/en.json';
import greekLanguage from 'src/assets/i18n/el.json';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  numberOfRows = 2;
  changeLanguageSubscription: Subscription;
  footerSubscription: Subscription;
  footer_content: FooterContent[];
  colsEqualtoRows: string;
  colsEqualtoArrLength: string;
  colsEqualto1: string;

  emailElement = {
    label: 'Email',
    type: 'email',
    placeholder: 'Ex. pat@example.com',
  };
  constructor(
    private sharedService: SharedService,
    private footerService: FooterService,
    private translate: TranslateService,
    private appService: AppService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setTranslation('el', greekLanguage);
    translate.setDefaultLang('en');
    translate.use('el');
  }

  ngOnInit(): void {
    // get translate language and subscribe
    this.changeLanguageSubscription = this.appService
      .getLanguageChangeListener()
      .subscribe((response) => {
        this.translate.use(response);
      });

    this.getFooterContent();
  }

  ngOnDestroy(): void {
    if (this.footerSubscription) this.footerSubscription.unsubscribe();
    if (this.changeLanguageSubscription)
      this.changeLanguageSubscription.unsubscribe();
  }

  getFooterContent() {
    this.footerSubscription = this.footerService
      .getLinks()
      .subscribe((response) => {
        this.footer_content = response.footer;

        this.colsEqualto1 = this.getFooterAreas(1);
        this.colsEqualtoRows = this.getFooterAreas(this.numberOfRows);
        this.colsEqualtoArrLength = this.getFooterAreas(
          this.footer_content.length
        );
      });
  }

  newsLetterForm = new FormGroup({
    emailControl: new FormControl('', {
      validators: [Validators.email],
    }),
  });

  // convertToFormControl(absCtrl: AbstractControl | null): FormControl {
  //   const ctrl = absCtrl as FormControl;
  //   return ctrl;
  // }

  onRegister(form: FormGroup) {
    // console.log(this.newsLetterForm);
    if (form.invalid) {
      console.log('form invalid');
      return;
    }
    // console.log(form);
  }

  getFooterAreas(numOfCols: number) {
    return this.sharedService.getGridAreas(numOfCols, this.footer_content);
  }
}
