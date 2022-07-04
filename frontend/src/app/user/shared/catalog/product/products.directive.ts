import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appProduct]',
})
export class ProductsDirective {
  constructor(private elementRef: ElementRef) {
    console.log(this.elementRef.nativeElement.offsetWidth);
  }
}
