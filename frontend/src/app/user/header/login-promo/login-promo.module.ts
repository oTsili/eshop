import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPromoComponent } from './login-promo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../shared/loader-factory';

@NgModule({
  declarations: [LoginPromoComponent],
  imports: [
    CommonModule,
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
  exports: [LoginPromoComponent],
})
export class LoginPromoModule {}
