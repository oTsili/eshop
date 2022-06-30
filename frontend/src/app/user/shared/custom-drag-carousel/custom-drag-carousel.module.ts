import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDragCarouselComponent } from './custom-drag-carousel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerModule } from '../spinner/spinner.module';
import { ProductModule } from '../products/product/product.module';

@NgModule({
  declarations: [CustomDragCarouselComponent],
  imports: [CommonModule, FlexLayoutModule, SpinnerModule, ProductModule],
  exports: [CustomDragCarouselComponent],
})
export class CustomDragCarouselModule {}
