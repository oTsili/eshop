import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[itemHost]',
})
export class ContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
