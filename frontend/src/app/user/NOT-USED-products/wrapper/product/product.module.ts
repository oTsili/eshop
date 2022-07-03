import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ProductComponent],
})
export class ProductModule {}
