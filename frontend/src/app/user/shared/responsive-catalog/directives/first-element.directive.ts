import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[firstElement]',
})
export class FirstElementDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
