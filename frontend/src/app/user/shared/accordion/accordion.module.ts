import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionComponent } from './accordion.component';
import { AccordionItem } from './directives/accordion-item.directive';
import { AccordionContent } from './directives/accordion-content.directive';
import { AccordionTitle } from './directives/accordion-title.directive';
import { AccordionHeader } from './directives/accordion-header.directive';
import { ClickAccordionHeader } from './directives/click-accordion-header.directive';
import { AccordionDirective } from './directives/accordion.directive';
import { PanelComponent } from './panel/panel-item.component';
import { DoubleSliderModule } from '../side-bar/double-slider/double-slider.module';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItem,
    AccordionContent,
    AccordionTitle,
    AccordionHeader,
    ClickAccordionHeader,
    AccordionDirective,
    PanelComponent,
  ],
  imports: [CommonModule],
  exports: [
    AccordionComponent,
    AccordionItem,
    AccordionContent,
    AccordionTitle,
    AccordionHeader,
    ClickAccordionHeader,
    DoubleSliderModule,
  ],
})
export class AccordionModule {}
