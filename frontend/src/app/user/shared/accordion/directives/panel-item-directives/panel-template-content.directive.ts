import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[panelContent]',
})
export class PanelContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
