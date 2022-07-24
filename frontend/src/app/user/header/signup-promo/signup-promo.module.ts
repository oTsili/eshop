import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPromoComponent } from './signup-promo.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../shared/loader-factory';

@NgModule({
  declarations: [SignupPromoComponent],
  imports: [
    CommonModule,
    MatButtonModule,
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
  exports: [SignupPromoComponent],
})
export class SignupPromoModule {}
