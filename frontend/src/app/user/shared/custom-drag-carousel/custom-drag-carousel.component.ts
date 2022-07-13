import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomDragCarouselService } from './custom-drag-carousel.service';

@Component({
  selector: 'app-custom-drag-carousel',
  templateUrl: './custom-drag-carousel.component.html',
  styleUrls: ['./custom-drag-carousel.component.scss'],
})
export class CustomDragCarouselComponent implements OnInit {
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('mainSlide') mainSlide: ElementRef;
  pos = { top: 0, left: 0, x: 0, y: 0 };
  isMouseDown = false;
  isAnimating = false;
  scrollToTimer: number | NodeJS.Timeout = -1;
  snapAnimationFinished = new EventEmitter();
  indexChanged = new EventEmitter();
  _index = 0;
  wrapperElementMarginRight = 0.07;
  isLoading = false;
  customCarouselSubscription: Subscription;

  // products = this.dynamicDatabase.products;
  products;

  get currIndex() {
    return this._index;
  }
  set currIndex(value) {
    if (value !== this._index) {
      this._index = value;
      this.indexChanged.emit(value);
    }
  }
  constructor(private customDragCarouselService: CustomDragCarouselService) {}

  ngOnInit(): void {
    this.preloadImages();
  }

  ngOnDestroy(): void {
    this.customCarouselSubscription.unsubscribe();
  }

  preloadImages() {
    this.isLoading = true;
    this.customCarouselSubscription = this.customDragCarouselService
      .getCarouselSlides()
      .subscribe((response) => {
        this.products = response.products;
        this.isLoading = false;
      });
  }

  moveLeft() {
    let slideWidth = this.mainSlide.nativeElement.clientWidth;
    let wrapper = this.wrapper.nativeElement;
    this.scrollTo(wrapper, 500, slideWidth, 'left');
  }

  moveRight() {
    let slideWidth = this.mainSlide.nativeElement.clientWidth;
    let wrapper = this.wrapper.nativeElement;
    this.scrollTo(wrapper, 500, slideWidth, 'right');
  }

  scrollTo(
    element: HTMLElement,
    duration: number,
    slideWidth: number,
    direction: string
  ) {
    const self = this;
    self.isAnimating = true;
    let start, change, increment;
    if (direction == 'right') {
      start = element.scrollLeft;
      change =
        slideWidth + slideWidth * (this.wrapperElementMarginRight + 0.03);
      increment = 20;
    } else if (direction === 'left') {
      start = element.scrollLeft;
      change = -(
        slideWidth +
        slideWidth * (this.wrapperElementMarginRight + 0.03)
      );
      increment = 20;
    }

    let currentTime = 0;
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return (c / 2) * t * t + b;
      }
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    const animateScroll = function () {
      currentTime += increment;
      element.scrollLeft = easeInOutQuad(currentTime, start, change, duration);

      if (currentTime < duration) {
        self.scrollToTimer = setTimeout(animateScroll, increment);
      } else {
        // run one more frame to make sure the animation is fully finished
        setTimeout(() => {
          self.isAnimating = false;
          self.snapAnimationFinished.emit(self.currIndex);
        }, increment);
      }
    };
    animateScroll();
  }

  mouseDownHandler(e: MouseEvent) {
    e.preventDefault();
    this.isMouseDown = true;
    this.pos = {
      // The current scroll
      left: this.wrapper.nativeElement.scrollLeft,
      top: this.wrapper.nativeElement.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    this.wrapper.nativeElement.style.userSelect = 'none';
  }

  mouseMoveHandler(e: MouseEvent) {
    e.preventDefault();
    if (!this.isMouseDown) {
      return;
    }
    // How far the mouse has been moved
    const dx = e.clientX - this.pos.x;
    const dy = e.clientY - this.pos.y;

    // Scroll the element
    this.wrapper.nativeElement.scrollTop = this.pos.top - dy;
    this.wrapper.nativeElement.scrollLeft = this.pos.left - dx;

    this.wrapper.nativeElement.style.removeProperty('user-select');
  }

  mouseUpHandler(e: MouseEvent) {
    e.preventDefault();
    if (!this.isMouseDown) {
      return;
    }
    let x = 0;
    let y = 0;
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;

    this.isMouseDown = false;
  }

  touchStartHandler(e: TouchEvent) {
    e.preventDefault();
    this.isMouseDown = true;
    this.pos = {
      // The current scroll
      left: this.wrapper.nativeElement.scrollLeft,
      top: this.wrapper.nativeElement.scrollTop,
      // Get the current mouse position
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    this.wrapper.nativeElement.style.userSelect = 'none';
  }

  touchMoveHandler(e: TouchEvent) {
    e.preventDefault();
    if (!this.isMouseDown) {
      return;
    }
    // How far the mouse has been moved
    const dx = e.changedTouches[0].clientX - this.pos.x;
    const dy = e.changedTouches[0].clientY - this.pos.y;

    // Scroll the element
    this.wrapper.nativeElement.scrollTop = this.pos.top - dy;
    this.wrapper.nativeElement.scrollLeft = this.pos.left - dx;

    this.wrapper.nativeElement.style.removeProperty('user-select');
  }

  touchCancelHandler(e: TouchEvent) {
    e.preventDefault();
    if (!this.isMouseDown) {
      return;
    }
    let x = 0;
    let y = 0;
    // Get the current mouse position
    x = e.changedTouches[0].clientX;
    y = e.changedTouches[0].clientY;

    this.isMouseDown = false;
  }
}
