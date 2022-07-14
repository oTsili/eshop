import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveComponentsComponent } from './responsive-components.component';
import { CategoryModule } from './category/category.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ResponsiveComponentsComponent],
  imports: [CommonModule, CategoryModule, FlexLayoutModule ],
  exports: [ResponsiveComponentsComponent],
})
export class ResponsiveComponentsModule {}
