import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
