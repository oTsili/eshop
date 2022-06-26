import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[panelHost]',
})
export class AccordionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
