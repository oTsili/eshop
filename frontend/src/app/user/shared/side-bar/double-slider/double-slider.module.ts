import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoubleSliderComponent } from './double-slider.component';
import { DoubleSliderDirective } from './double-slider.directive';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../input/input.module';

@NgModule({
  declarations: [DoubleSliderComponent, DoubleSliderDirective],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    InputModule,
  ],
  exports: [],
})
export class DoubleSliderModule {}
