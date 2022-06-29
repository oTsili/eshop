import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionModule } from '../accordion/accordion.module';
import { SideBarComponent } from './side-bar.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentListComponent } from './content-list/content-list.component';
import { GridBoxesComponent } from './grid-boxes/grid-boxes.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [
    SideBarComponent,
    ColorSelectorComponent,
    ContentListComponent,
    GridBoxesComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    InputModule,
  ],
  exports: [SideBarComponent],
})
export class SideBarModule {}
