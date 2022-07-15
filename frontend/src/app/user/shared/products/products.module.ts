import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductModule } from './product/product.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorModule } from '../paginator/paginator.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductModule,
    FlexLayoutModule,
    PaginatorModule,
    // MatPaginatorModule,
  ],
  exports: [ProductsComponent],
})
export class ProductsModule {}
