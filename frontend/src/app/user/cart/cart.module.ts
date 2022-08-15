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

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    TaxShippingModule,
    ProductModule,
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
