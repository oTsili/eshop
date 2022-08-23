import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableRowHeader]',
})
export class TableRowHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
