import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ResponsiveCatalogModule } from '../shared/NOT-USED-responsive-catalog/responsive-catalog.module';
import { WrapperModule } from './wrapper/wrapper.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ResponsiveCatalogModule, WrapperModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
