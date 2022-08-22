import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableRowContent]',
})
export class TableRowContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
