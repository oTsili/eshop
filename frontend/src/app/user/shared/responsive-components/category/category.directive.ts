import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCategory]',
})
export class CategoryDirective {
  constructor(private elementRef: ElementRef) {}
}
