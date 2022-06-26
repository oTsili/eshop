import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[panelHost]',
})
export class AccordionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
