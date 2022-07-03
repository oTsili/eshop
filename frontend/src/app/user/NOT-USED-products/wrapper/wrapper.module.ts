import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductModule } from './product/product.module';
import { WrapperComponent } from './wrapper.component';

@NgModule({
  declarations: [WrapperComponent],
  imports: [CommonModule, ProductModule],
  exports: [WrapperComponent],
})
export class WrapperModule {}
