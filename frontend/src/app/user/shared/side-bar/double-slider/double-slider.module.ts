import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { DoubleSliderComponent } from './double-slider.component';
import { DoubleSliderDirective } from './double-slider.directive';

@NgModule({
  declarations: [DoubleSliderComponent, DoubleSliderDirective],
  imports: [CommonModule, MatSliderModule],
  exports: [],
})
export class DoubleSliderModule {}
