import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductModule } from './product/product.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorModule } from '../paginator/paginator.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../loader-factory';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductModule,
    FlexLayoutModule,
    PaginatorModule,
    // MatPaginatorModule,
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
  exports: [ProductsComponent],
})
export class ProductsModule {}
