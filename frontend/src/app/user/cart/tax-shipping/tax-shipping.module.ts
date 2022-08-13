import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxShippingComponent } from './tax-shipping.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../shared/loader-factory';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [TaxShippingComponent, FormComponent],
  imports: [
    CommonModule,
    AccordionModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TaxShippingComponent],
})
export class TaxShippingModule {}
