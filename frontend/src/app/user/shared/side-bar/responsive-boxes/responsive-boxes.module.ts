import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveBoxesComponent } from './responsive-boxes.component';
import { ResponsiveCatalogModule } from '../../responsive-catalog/responsive-catalog.module';

@NgModule({
  declarations: [ResponsiveBoxesComponent],
  imports: [CommonModule, ResponsiveCatalogModule],
  exports: [ResponsiveBoxesComponent],
})
export class ResponsiveBoxesModule {}
