import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionModule } from '../accordion/accordion.module';
import { SideBarComponent } from './side-bar.component';

@NgModule({
  declarations: [SideBarComponent],
  imports: [CommonModule, AccordionModule],
  exports: [SideBarComponent],
})
export class SideBarModule {}
