import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLinkImgsComponent } from './grid-link-imgs.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [GridLinkImgsComponent],
  imports: [CommonModule, SpinnerModule, FlexLayoutModule],
  exports: [GridLinkImgsComponent],
})
export class GridLinkImgsModule {}
