import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[tableRowHost]',
})
export class TableRowDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
