import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[app-item]',
})
export class ItemContent {
  constructor(public templateRef: TemplateRef<any>) {}
}
