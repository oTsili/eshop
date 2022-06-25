import { Injectable } from '@angular/core';
import { SideBar } from './side-bar.interface';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  sidebar: SideBar = {
    header: 'ΦΙΛΤΡΑ',
  };
}
