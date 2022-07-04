import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { ProductModule } from './product/product.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CatalogComponent],
  imports: [CommonModule, ProductModule, FlexLayoutModule],
  exports: [CatalogComponent],
})
export class CatalogModule {}
