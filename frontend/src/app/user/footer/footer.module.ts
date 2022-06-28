import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '../shared/input/input.module';
import { FooterComponent } from './footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    InputModule,
    MatToolbarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [FooterComponent],
})
export class FooterModule {}
