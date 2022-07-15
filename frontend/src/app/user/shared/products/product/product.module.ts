import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductDirective } from './product.directive';

@NgModule({
  declarations: [ProductComponent, ProductDirective],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ProductComponent],
})
export class ProductModule {}
