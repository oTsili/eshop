import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { SelectInputModule } from '../../shared/select-input/select-input.module';
import { AddProductsDirectivesModule } from '../directives/add-products-directives.module';

@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    AddProductsDirectivesModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SelectInputModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [ProductFormComponent],
})
export class ProductFormModule {}
