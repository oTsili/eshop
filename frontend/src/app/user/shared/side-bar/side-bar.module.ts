import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionModule } from '../accordion/accordion.module';
import { SideBarComponent } from './side-bar.component';
import { ResponsiveBoxesComponent } from './responsive-boxes/responsive-boxes.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentListComponent } from './content-list/content-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { InputModule } from '../input/input.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SideBarComponent,
    ResponsiveBoxesComponent,
    ContentListComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    InputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    // FormsModule,
  ],
  exports: [SideBarComponent],
})
export class SideBarModule {}
