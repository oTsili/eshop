import { Component, Input, OnInit } from '@angular/core';
import { Slide } from './custom-carousel.interface';
import {
  animate,
  trigger,
  transition,
  useAnimation,
  state,
  style,
} from '@angular/animations';

import {
  AnimationType,
  scaleIn,
  scaleOut,
  fadeIn,
  fadeOut,
  flipIn,
  flipOut,
  jackIn,
  jackOut,
  easein,
} from './custom-carousel.animations';

@Component({
  selector: 'carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss'],
  animations: [
    // [
    //   trigger('flyInOut', [
    //     state('in', style({ transform: 'translateX(0)' })),
    //     transition('void => *', [
    //       style({ transform: 'translateX(-100%)' }),
    //       animate(100),
    //     ]),
    //     transition('* => void', [
    //       animate(100, style({ transform: 'translateX(100%)' })),
    //     ]),
    //   ]),
    // ],
    trigger('slideAnimation', [
      /* scale */
      transition('void => scale', [
        useAnimation(scaleIn, { params: { time: '500ms' } }),
      ]),
      transition('scale => void', [
        useAnimation(scaleOut, { params: { time: '500ms' } }),
      ]),

      /* fade */
      transition('void => fade', [
        useAnimation(fadeIn, { params: { time: '500ms' } }),
      ]),
      transition('fade => void', [
        useAnimation(fadeOut, { params: { time: '500ms' } }),
      ]),
      /* flip */
      transition('void => flip', [
        useAnimation(flipIn, { params: { time: '500ms' } }),
      ]),
      transition('flip => void', [
        useAnimation(flipOut, { params: { time: '500ms' } }),
      ]),
      /* flip */
      transition('void => flip', [
        useAnimation(easein, { params: { time: '500ms' } }),
      ]),

      /* JackInTheBox */
      transition('void => jackInTheBox', [
        useAnimation(jackIn, { params: { time: '700ms' } }),
      ]),
      transition('jackInTheBox => void', [
        useAnimation(jackOut, { params: { time: '700ms' } }),
      ]),
    ]),
  ],
})
export class CustomCarouselComponent implements OnInit {
  // @Input() slides: Slide[];
  // @Input() animationType = AnimationType.Scale;
  animationType = 'easein';

  slides: Slide[] = [
    {
      headline: 'For Your Current Mood',
      src: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    },
    {
      headline: 'Miouw',
      src: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80',
    },
    {
      headline: 'In The Wilderness',
      src: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
    },
    {
      headline: 'Focus On The Writing',
      src: 'https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80',
    },
  ];

  currentSlide = 0;

  constructor() {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log('next clicked, new current slide is: ', this.currentSlide);
  }

  slideShow = async () => {
    setTimeout(() => {
      this.onNextClick();
      this.slideShow();
    }, 5000);
  };

  ngOnInit() {
    this.preloadImages(); // for the demo

    this.slideShow();
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }
}
