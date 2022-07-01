import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductModule } from './product/product.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductModule, FlexLayoutModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
