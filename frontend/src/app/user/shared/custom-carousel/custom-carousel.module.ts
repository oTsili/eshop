import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCarouselComponent } from './custom-carousel.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CustomCarouselComponent],
  imports: [CommonModule, SpinnerModule, FlexLayoutModule, NgbModule],
  exports: [CustomCarouselComponent],
})
export class CustomCarouselModule {}
