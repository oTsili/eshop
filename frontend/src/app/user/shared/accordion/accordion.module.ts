import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { ToggleAccordionDirective } from './directives/toggle-accordion.directive';
import { PanelHostDirective } from './directives/panel-host.directive';
// import { TextPanelComponent } from './panels/EXAMPLE-text-panel/text-panel.component';
import { PanelCollapseDirective } from './panels/collapsed.directive';
import { PanelItemDirective } from './directives/panel-item-directives/panel-template-item.directive';
import { PanelHeaderDirective } from './directives/panel-item-directives/panel-template-header.directive';
import { PanelContentDirective } from './directives/panel-item-directives/panel-template-content.directive';

@NgModule({
  declarations: [
    AccordionComponent,
    ToggleAccordionDirective,
    PanelCollapseDirective,
    PanelHostDirective,
    PanelItemDirective,
    PanelHeaderDirective,
    PanelContentDirective,
    // TextPanelComponent,
  ],
  imports: [CommonModule],
  exports: [
    AccordionComponent,
    PanelItemDirective,
    PanelHeaderDirective,
    PanelContentDirective,
  ],
})
export class AccordionModule {}
