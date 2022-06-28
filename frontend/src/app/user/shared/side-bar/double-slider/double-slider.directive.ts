import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDoubleSlider]',
})
export class DoubleSliderDirective {
  constructor(private elementRef: ElementRef) {
    console.log(this.elementRef);
  }
}
