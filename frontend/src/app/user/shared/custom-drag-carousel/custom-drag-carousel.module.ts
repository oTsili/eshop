import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomDragCarouselComponent } from './custom-drag-carousel.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { ProductModule } from '../../product/product.module';
import { CatalogDetailsModule } from '../../product/catalog-details/catalog-details.module';

@NgModule({
  declarations: [CustomDragCarouselComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SpinnerModule,
    ProductModule,
    CatalogDetailsModule,
  ],
  exports: [CustomDragCarouselComponent],
})
export class CustomDragCarouselModule {}
