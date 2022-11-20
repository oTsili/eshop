import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProductModule } from 'src/app/user/product/product.module';
import { AccordionModule } from 'src/app/user/shared/accordion/accordion.module';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { OrderAccordionComponent } from './order-accordion.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  declarations: [OrderAccordionComponent, OrderSummaryComponent],
  imports: [
    CommonModule,
    AccordionModule,
    ProductModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [OrderAccordionComponent],
})
export class OrderAccordionModule {}
