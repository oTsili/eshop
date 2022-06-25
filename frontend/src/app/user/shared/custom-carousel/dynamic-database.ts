import { Injectable } from '@angular/core';
import { Slide } from './custom-carousel.interface';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  slides: Slide[];
}
