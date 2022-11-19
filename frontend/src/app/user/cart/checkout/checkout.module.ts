import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { RouterModule } from '@angular/router';
import { ShippingModule } from './shipping/shipping.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../shared/loader-factory';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    BreadcrumbModule,
    ShippingModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // RouterModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: CheckoutComponent,
      },
    ]),
  ],
})
export class CheckoutModule {}
