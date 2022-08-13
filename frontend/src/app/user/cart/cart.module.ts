import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { RouterModule } from '@angular/router';
import { TaxShippingModule } from './tax-shipping/tax-shipping.module';
import { ProductModule } from '../product/product.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    TaxShippingModule,
    ProductModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: CartComponent,
      },
    ]),
  ],
})
export class CartModule {}
