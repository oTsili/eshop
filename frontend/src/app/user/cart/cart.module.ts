import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { RouterModule } from '@angular/router';
import { TaxShippingModule } from './tax-shipping/tax-shipping.module';
import { ProductModule } from '../product/product.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../shared/loader-factory';
import { CartRoutingModule } from './cart-routing.module';
import { EditProductModule } from './edit-product/edit-product.module';
import { CheckoutModule } from './checkout/checkout.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CartRoutingModule,
    CommonModule,
    BreadcrumbModule,
    TaxShippingModule,
    ProductModule,
    CheckoutModule,
    EditProductModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
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
