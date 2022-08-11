import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  elements = [
    {
      text: 'addressbook',
    },
    {
      text: 'orders',
    },
    {
      text: 'profile',
    },
    { text: 'whishlist' },
  ];
}
