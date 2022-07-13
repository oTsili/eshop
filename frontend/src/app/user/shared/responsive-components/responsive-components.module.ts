import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveComponentsComponent } from './responsive-components.component';
import { CategoryModule } from './category/category.module';

@NgModule({
  declarations: [ResponsiveComponentsComponent],
  imports: [CommonModule, CategoryModule, ],
  exports: [ResponsiveComponentsComponent],
})
export class ResponsiveComponentsModule {}
