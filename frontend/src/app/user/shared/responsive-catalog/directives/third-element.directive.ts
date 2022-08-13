import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[thirdElement]',
})
export class ThirdElementDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
