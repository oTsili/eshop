import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { DynamicDatabase } from './dynamic-database';

@Component({
  selector: 'app-custom-drag-carousel',
  templateUrl: './custom-drag-carousel.component.html',
  styleUrls: ['./custom-drag-carousel.component.css'],
})
export class CustomDragCarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('wrapper') wrapper: ElementRef;
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
    // console.log(this.wrapper.nativeElement);
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
