import { Injectable } from '@angular/core';
import { navBarElement } from './header.interfaces';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  navBarElements: navBarElement[];
}
