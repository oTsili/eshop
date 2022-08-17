import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[panelContent]',
})
export class ImageTemplateContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
