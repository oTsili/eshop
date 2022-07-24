import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appProduct]',
})
export class ProductDirective {
  constructor(private elementRef: ElementRef) {
  }
}
