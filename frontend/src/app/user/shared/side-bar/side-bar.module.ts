import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionModule } from '../accordion/accordion.module';
import { SideBarComponent } from './side-bar.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SideBarComponent, ColorSelectorComponent],
  imports: [CommonModule, AccordionModule, FlexLayoutModule],
  exports: [SideBarComponent],
})
export class SideBarModule {}
