import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ResponsiveCatalogModule } from '../shared/responsive-catalog/responsive-catalog.module';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [ProductsComponent, ProductComponent],
  imports: [CommonModule, ResponsiveCatalogModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
