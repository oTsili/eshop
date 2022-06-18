import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  easeout,
} from './custom-carousel.animations';
import { interval, Subscription } from 'rxjs';
import { CustomCarouselService } from './custom-carousel.service';

@Component({
  selector: 'app-custom-carousel',
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
      /* easein */
      transition('void => easein', [
        useAnimation(easein, { params: { time: '500ms' } }),
      ]),
      transition('easein => void', [
        useAnimation(easeout, { params: { time: '500ms' } }),
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
export class CustomCarouselComponent implements OnInit, OnDestroy {
  // @Input() slides: Slide[];
  // @Input() animationType = AnimationType.Scale;
  animationType = 'easein';
  imagesLengthSubscription: Subscription;
  intervalId: NodeJS.Timer | null;

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

  currentSlide = 0;

  constructor(private customCarouselService: CustomCarouselService) {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    // console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick(len: number) {
    const next = this.currentSlide + 1;
    this.currentSlide = next === len ? 0 : next;
  }

  slideShow() {
    this.intervalId = setInterval(() => {
      this.customCarouselService.onImagesLengthUpdate(this.slides.length);
    }, 5000);
  }

  stopSlideShow() {
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }

  ngOnInit() {
    this.preloadImages();
    this.imagesLengthSubscription = this.customCarouselService
      .getImagesLengthListener()
      .subscribe((response) => {
        this.onNextClick(response.imagesLength);
      });

    this.slideShow();
  }

  ngOnDestroy(): void {
    this.imagesLengthSubscription.unsubscribe();
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }
}
