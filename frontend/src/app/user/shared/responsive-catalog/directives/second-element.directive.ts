import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[secondElement]',
})
export class SecondElementDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
