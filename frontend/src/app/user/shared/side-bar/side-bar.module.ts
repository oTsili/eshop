import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionModule } from '../accordion/accordion.module';
import { SideBarComponent } from './side-bar.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentListComponent } from './content-list/content-list.component';
import { GridBoxesComponent } from './grid-boxes/grid-boxes.component';

@NgModule({
  declarations: [SideBarComponent, ColorSelectorComponent, ContentListComponent, GridBoxesComponent],
  imports: [CommonModule, AccordionModule, FlexLayoutModule],
  exports: [SideBarComponent],
})
export class SideBarModule {}
