import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsDirective } from './products.directive';

@NgModule({
  declarations: [ProductComponent, ProductsDirective],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ProductComponent],
})
export class ProductModule {}
