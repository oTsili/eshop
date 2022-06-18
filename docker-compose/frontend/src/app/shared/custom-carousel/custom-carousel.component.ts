import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { Slide } from './custom-carousel.interface';
// import {
//   animate,
//   trigger,
//   transition,
//   useAnimation,
//   state,
//   style,
// } from '@angular/animations';

// import {
//   AnimationType,
//   scaleIn,
//   scaleOut,
//   fadeIn,
//   fadeOut,
//   flipIn,
//   flipOut,
//   jackIn,
//   jackOut,
//   easein,
//   easeout,
// } from './custom-carousel.animations';
import { Subscription } from 'rxjs';
import { DynamicDatabase } from './dynamic-database';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss'],
  // animations: [
  //   trigger('slideAnimation', [
  //     /* scale */
  //     transition('void => scale', [
  //       useAnimation(scaleIn, { params: { time: '500ms' } }),
  //     ]),
  //     transition('scale => void', [
  //       useAnimation(scaleOut, { params: { time: '500ms' } }),
  //     ]),

  //     /* fade */
  //     transition('void => fade', [
  //       useAnimation(fadeIn, { params: { time: '500ms' } }),
  //     ]),
  //     transition('fade => void', [
  //       useAnimation(fadeOut, { params: { time: '500ms' } }),
  //     ]),
  //     /* flip */
  //     transition('void => flip', [
  //       useAnimation(flipIn, { params: { time: '500ms' } }),
  //     ]),
  //     transition('flip => void', [
  //       useAnimation(flipOut, { params: { time: '500ms' } }),
  //     ]),
  //     /* easein */
  //     transition('void => easein', [
  //       useAnimation(easein, { params: { time: '500ms' } }),
  //     ]),
  //     transition('easein => void', [
  //       useAnimation(easeout, { params: { time: '500ms' } }),
  //     ]),

  //     /* JackInTheBox */
  //     transition('void => jackInTheBox', [
  //       useAnimation(jackIn, { params: { time: '700ms' } }),
  //     ]),
  //     transition('jackInTheBox => void', [
  //       useAnimation(jackOut, { params: { time: '700ms' } }),
  //     ]),
  //   ]),
  // ],
})
export class CustomCarouselComponent implements OnInit, OnDestroy {
  // animationType = 'easein';
  imagesLengthSubscription: Subscription;
  intervalId: NodeJS.Timer | null;

  currentSlide = 0;

  constructor(public dynamicDatabase: DynamicDatabase) {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide =
      previous < 0 ? this.dynamicDatabase.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.dynamicDatabase.slides.length ? 0 : next;
  }

  slideShow() {
    this.intervalId = setInterval(() => {
      this.onNextClick();
    }, 5000);
  }

  stopSlideShow() {
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }

  ngOnInit() {
    this.preloadImages();

    this.slideShow();
  }

  ngOnDestroy(): void {
    this.imagesLengthSubscription.unsubscribe();
  }

  preloadImages() {
    for (const slide of this.dynamicDatabase.slides) {
      new Image().src = slide.src;
    }
  }
}
