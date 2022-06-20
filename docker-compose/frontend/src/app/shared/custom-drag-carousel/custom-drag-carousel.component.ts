import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import { DynamicDatabase } from './dynamic-database';

@Component({
  selector: 'app-custom-drag-carousel',
  templateUrl: './custom-drag-carousel.component.html',
  styleUrls: ['./custom-drag-carousel.component.scss'],
})
export class CustomDragCarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('slides') slides: ElementRef;
  pos = { top: 0, left: 0, x: 0, y: 0 };
  isMouseDown = false;

  constructor(
    public dynamicDatabase: DynamicDatabase,
    private elementRef: ElementRef,
    private render: Renderer2
  ) {}
  products = this.dynamicDatabase.products;

  ngOnInit(): void {
    // console.log(this.slide.nativeElement);
  }

  ngAfterViewInit(): void {
    // console.log(this.wrapper.nativeElement);moveLeft
    this.moveLeft();
  }

  moveLeft() {
    const container = this.container.nativeElement;
    const containerWidth = container.clientWidth;
    const offsetWidth = container.offsetWidth;

    const childrenObj = this.slides.nativeElement.children;
    const childrenLen = Object.values(childrenObj).length;
    this.wrapper.nativeElement.scrollLeft =
      this.wrapper.nativeElement.scrollLeft -
      (containerWidth + offsetWidth) / childrenLen;

    console.log(this.wrapper.nativeElement.scrollLeft);
    console.log((containerWidth + offsetWidth) / childrenLen);
    console.log(this.wrapper.nativeElement);
    // wrapper.scrollToTimer;
  }

  maximumIndex(containerWidth, childrenElements) {}

  isScrollReachesRightEnd() {
    const container = this.container.nativeElement;
    const scrollLeftPos = container.scrollLeft + container.offsetWidth;
    return scrollLeftPos >= container.scrollWidth;
  }

  moveRight() {
    const container = this.container.nativeElement;
    const containerWidth = container.clientWidth;
    const offsetWidth = container.offsetWidth;

    const childrenObj = this.slides.nativeElement.children;
    const childrenLen = Object.values(childrenObj).length;
    this.wrapper.nativeElement.scrollLeft =
      this.wrapper.nativeElement.scrollLeft +
      (containerWidth + offsetWidth) / childrenLen;

    console.log(this.wrapper.nativeElement.scrollLeft);
    console.log((containerWidth + offsetWidth) / childrenLen);
    console.log(this.wrapper.nativeElement);
  }

  scrollTo(element, to, duration) {}

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
