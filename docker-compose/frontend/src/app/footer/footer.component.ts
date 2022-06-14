import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
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
          link: '#',
        },
      ],
    },
    {
      header: 'ΠΛΗΡΟΦΟΡΙΕΣ',
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
  constructor() {}

  ngOnInit(): void {}
}
