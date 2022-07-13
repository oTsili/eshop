import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appProduct]',
})
export class CategoryDirective {
  constructor(private elementRef: ElementRef) {
    console.log(this.elementRef.nativeElement.offsetWidth);
  }
}
