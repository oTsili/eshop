import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[panelHeader]',
})
export class PanelHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
