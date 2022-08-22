import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeNumbersComponent } from './trade-numbers.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRowDirective } from './directives/add-row.directive';
import { enableFormDirective } from './directives/enable-form-control.directive';

@NgModule({
  declarations: [TradeNumbersComponent, AddRowDirective, enableFormDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  // exports: [addRowDirective],
})
export class TradeNumbersModule {}
