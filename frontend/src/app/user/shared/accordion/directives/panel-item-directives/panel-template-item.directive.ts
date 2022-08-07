import { ContentChild, Directive } from '@angular/core';
import { PanelContentDirective } from './panel-template-content.directive';
import { PanelHeaderDirective } from './panel-template-header.directive';

@Directive({
  selector: 'panel-item',
})
export class PanelItemDirective {
  @ContentChild(PanelHeaderDirective) panelHeader: PanelHeaderDirective;
  @ContentChild(PanelContentDirective) panelContent: PanelContentDirective;
}
