import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductShowcaseComponent } from './product-showcase.component';
import { ThumbnailModule } from './thumbnail/thumbnail.module';
import { CarouselModule } from './carousel/carousel.module';
import { SideBarModule } from './side-bar/side-bar.module';

@NgModule({
  declarations: [ProductShowcaseComponent],
  imports: [CommonModule, ThumbnailModule, CarouselModule, SideBarModule],
  exports: [ProductShowcaseComponent],
})
export class ProductShowcaseModule {}
