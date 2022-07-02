import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[itemHost]',
})
export class ResponsiveCatalogDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
