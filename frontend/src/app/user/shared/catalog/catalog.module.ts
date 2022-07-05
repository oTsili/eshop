import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { ProductModule } from './product/product.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ItemDirective } from './item/item.directive';
import { ItemComponent } from './item/item.component';
import { InvokeDirective } from './catalog.directive';


@NgModule({
  declarations: [
    CatalogComponent,
    ItemDirective,
    ItemComponent,
    InvokeDirective,
  ],
  imports: [CommonModule, ProductModule, FlexLayoutModule],
  exports: [CatalogComponent],
})
export class CatalogModule {}
