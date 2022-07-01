import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ResponsiveCatalogModule } from '../shared/responsive-catalog/responsive-catalog.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ResponsiveCatalogModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
