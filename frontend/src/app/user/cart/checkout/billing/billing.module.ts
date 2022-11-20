import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { OrderAccordionModule } from '../order-accordion/order-accordion.module';
import { BillingComponent } from './billing.component';

@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    OrderAccordionModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forChild({
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
        component: BillingComponent,
      },
    ]),
  ],
  exports: [],
})
export class BillingModule {}
