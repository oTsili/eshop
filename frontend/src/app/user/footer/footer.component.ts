import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { FooterContent } from './footer.interface';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  numberOfRows = 2;

  footer_content: FooterContent[];

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

  getFooterContent() {
    this.footerService.getLinks().subscribe((response) => {
      this.footer_content = response.footer;
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
