import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Directive({ selector: '[elementWidth]' })
export class ElementWidthDirective implements AfterViewInit {
  @Output() getElementWidth = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    const elementWidth = this.elementRef.nativeElement.clientWidth;
    // console.log(this.elementRef)
    // console.log(this.elementRef.nativeElement.clientWidth)

    let marginRight = window
      .getComputedStyle(element)
      .getPropertyValue('margin-right');
    let marginLeft = window
      .getComputedStyle(element)
      .getPropertyValue('margin-left');
    let totalMargin = parseInt(marginLeft) + parseInt(marginRight);
    // console.log({ marginRight });
    // console.log({ marginLeft });
    // console.log({ totalMargin });
    this.getElementWidth.emit({ elementWidth, totalMargin });
  }
}
