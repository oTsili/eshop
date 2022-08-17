import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[imageContainerHost]',
})
export class ImageContainerHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
