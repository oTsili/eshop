import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Slide } from './custom-carousel.interface';
import { CustomCarouselService } from './custom-carousel.service';
import { DynamicDatabase } from './dynamic-database';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss'],
})
export class CustomCarouselComponent implements OnInit, OnDestroy {
  intervalId: NodeJS.Timer | null;
  carouselSlidesSubscription: Subscription;
  isLoading = false;
  currentSlide = 0;
  slides: Slide[];

  constructor(
    public dynamicDatabase: DynamicDatabase,
    private customCarouselService: CustomCarouselService
  ) {}

  ngOnInit() {
    this.preloadImages();

    this.slideShow();
  }

  ngOnDestroy(): void {
    this.carouselSlidesSubscription.unsubscribe();
  }

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

  preloadImages() {
    this.isLoading = true;
    this.carouselSlidesSubscription = this.customCarouselService
      .getCarouselSlides()
      .subscribe((response) => {
        // console.log(response);
        this.slides = response.carouselSlides;
        this.dynamicDatabase.slides = this.slides;
        this.isLoading = false;
      });
  }
}
