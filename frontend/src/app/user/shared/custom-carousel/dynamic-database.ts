import { Injectable } from '@angular/core';
import { Slide } from './custom-carousel.interface';

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  slides: Slide[] = [
    {
      headline: 'For Your Current Mood',
      src: './assets/images/hero/1.webp',
      header: 'Lorem Ipsum is simply dummy text of the printing',
      subheader:
        'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
    },
    {
      headline: 'Miouw',
      src: './assets/images/hero/2.webp',
      header: 'It is a long established fact that a reader will',
      subheader:
        'Be distracted by the readable content of a page when looking at its layout',
    },
    {
      headline: 'In The Wilderness',
      src: './assets/images/hero/3.webp',
      header: 'Like readable English. Many desktop publishing packages ',
      subheader:
        'And web page editors now use Lorem Ipsum as their default model text',
    },
    {
      headline: 'Focus On The Writing',
      src: './assets/images/hero/4.webp',
      header: 'Recently with desktop publishing',
      subheader:
        'Many desktop publishing packages and web page editors now use Lorem Ipsum',
    },
  ];
}
