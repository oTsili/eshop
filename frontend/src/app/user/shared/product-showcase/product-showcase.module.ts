import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductShowcaseComponent } from './product-showcase.component';
import { ThumbnailModule } from './thumbnail/thumbnail.module';

@NgModule({
  declarations: [ProductShowcaseComponent],
  imports: [CommonModule, ThumbnailModule],
  exports: [ProductShowcaseComponent],
})
export class ProductShowcaseModule {}
