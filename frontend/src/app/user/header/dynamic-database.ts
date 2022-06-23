import { Injectable } from '@angular/core';
import { navBarElement } from './header.interfaces';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  navBarElements: navBarElement[] = [
    {
      text: 'ΝΕΕΣ ΠΑΡΑΛΑΒΕΣ',
      href: '#',
    },
    {
      text: 'ΠΑΠΟΥΤΣΙΑ',
      href: '#',
      subNavBarElements: [
        {
          text: 'ΓΟΒΕΣ',
          href: '#',
        },
        {
          text: 'ΠΕΔΙΛΑ',
          href: '#',
        },
        {
          text: 'SNEAKERS',
          href: '#',
        },
        {
          text: 'OXFORD',
          href: '#',
        },
        {
          text: 'ΜΠΑΛΑΡΙΝΕΣ',
          href: '#',
        },
        {
          text: 'ΜΠΟΤΕΣ',
          href: '#',
        },
        {
          text: 'ΜΠΟΤΑΚΙΑ',
          href: '#',
        },
        {
          text: 'ΜΠΟΤΑΚΙΑ',
          href: '#',
        },
        {
          text: 'MULES',
          href: '#',
        },
        {
          text: 'ΠΛΑΤΦΟΡΜΕΣ',
          href: '#',
        },
        {
          text: 'ΑΡΒΥΛΕΣ',
          href: '#',
        },
      ],
    },
    {
      text: 'ΑΞΕΣΟΥΑΡ',
      href: '#',
    },
    {
      text: 'ΠΡΟΣΦΟΡΕΣ',
      href: '#',
    },
    {
      text: 'ΕΠΙΚΟΙΝΩΝΙΑ',
      href: '#',
    },
    {
      text: 'ΕΝΔΥΣΗ',
      href: '#',
    },
  ];
}
