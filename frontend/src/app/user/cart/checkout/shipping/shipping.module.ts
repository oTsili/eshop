import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from './shipping.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';

@NgModule({
  declarations: [ShippingComponent],
  imports: [
    CommonModule,

    // RouterModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ShippingComponent,
      },
    ]),
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
})
export class ShippingModule {}
