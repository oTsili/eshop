import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { AddProductsDirectivesModule } from '../../add-products/directives/add-products-directives.module';
import { SelectInputComponent } from './select-input.component';

@NgModule({
  declarations: [SelectInputComponent],
  imports: [
    CommonModule,
    AddProductsDirectivesModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [SelectInputComponent],
})
export class SelectInputModule {}
