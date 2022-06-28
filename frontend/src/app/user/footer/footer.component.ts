import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  numberOfRows = 2;

  footer_content = [
    {
      header: 'ΤΗΛΕΦΩΝΙΚΕΣ ΠΑΡΑΓΓΕΛΙΕΣ',
      links: [
        {
          text: 'Τηλεφωνικές Παραγγελίες',
          link: '#',
        },
        {
          text: '+30 2310 760 187',
          link: 'tel:+302310760187',
        },
      ],
    },
    {
      header: 'ΧΡΗΣΙΜΟΙ ΣΥΝΔΕΣΜΟΙ',
      links: [
        {
          text: 'Η Εταιρεία',
          link: '#',
        },
        {
          text: 'Σύνδεση',
          link: '#',
        },
        {
          text: 'Ο Λογαριασμός μου',
          link: '#',
        },
        {
          text: 'Επικοινωνία',
          link: '#',
        },
      ],
    },
    {
      header: 'ΕΞΥΠΗΡΕΤΗΣΗ ΠΕΛΑΤΩΝ',
      links: [
        {
          text: 'Η Εταιρεία',
          link: '#',
        },
        {
          text: 'Τρόποι Αποστολής/Πληρωμής',
          link: '#',
        },
        {
          text: 'Αλλαγές/Επιστροφές',
          link: '#',
        },
        {
          text: 'Όροι και Προϋποθέσεις',
          link: '#',
        },
        {
          text: 'Πολιτική Απορρήτου',
          link: '#',
        },
        {
          text: 'Μεγεθολόγιο',
          link: '#',
        },
      ],
    },
    {
      header: 'ΕΓΓΡΑΦΗ ΣΤΟ NEWSLETTER',
    },
  ];

  emailElement = {
    label: 'Email',
    type: 'email',
    placeholder: 'Ex. pat@example.com',
  };
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

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
