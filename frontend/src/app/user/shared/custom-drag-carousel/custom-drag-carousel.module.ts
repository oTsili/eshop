import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDragCarouselComponent } from './custom-drag-carousel.component';
import { DragSlideComponent } from './drag-slide/drag-slide.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [CustomDragCarouselComponent, DragSlideComponent],
  imports: [CommonModule, FlexLayoutModule, SpinnerModule],
  exports: [CustomDragCarouselComponent],
})
export class CustomDragCarouselModule {}
