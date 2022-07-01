import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemModule } from './item/item.module';
import { ResponsiveCatalogComponent } from './responsive-catalog.component';

@NgModule({
  declarations: [ResponsiveCatalogComponent],
  imports: [CommonModule, ItemModule],
  exports: [ResponsiveCatalogComponent],
})
export class ResponsiveCatalogModule {}
