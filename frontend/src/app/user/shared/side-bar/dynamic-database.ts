import { Injectable } from '@angular/core';
import { SideBar } from './side-bar.interface';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  sidebar: SideBar = {
    header: 'ΦΙΛΤΡΑ',
    accordions: [
      {
        header: 'ΧΡΩΜΑ',
        component: 'colorSelector',
      },
      {
        header: 'ΥΨΟΣ ΤΑΚΟΥΝΙΟΥ',
        component: 'height',
      },
      {
        header: 'ΜΕΓΕΘΟΣ',
        component: 'size',
      },
      {
        header: 'ΤΙΜΗ',
        component: 'value',
      },
      {
        header: 'ΕΚΠΤΩΣΗ',
        component: 'sales',
      },
      {
        header: 'ΥΛΙΚΟ',
        component: 'material',
      },
    ],
  };
}
