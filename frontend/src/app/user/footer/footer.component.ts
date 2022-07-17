import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { FooterContent } from './footer.interface';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  numberOfRows = 2;
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
    private footerService: FooterService
  ) {}

  ngOnInit(): void {
    this.getFooterContent();
  }

  ngOnDestroy(): void {
    this.footerSubscription.unsubscribe();
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
    console.log(this.newsLetterForm);
    if (form.invalid) {
      console.log('form invalid');
      return;
    }
    console.log(form);
  }

  getFooterAreas(numOfCols: number) {
    return this.sharedService.getGridAreas(numOfCols, this.footer_content);
  }
}
