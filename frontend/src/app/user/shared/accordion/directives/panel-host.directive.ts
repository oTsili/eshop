import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[panelHost]',
})
export class PanelHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
