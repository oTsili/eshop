import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product.component';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../shared/loader-factory';
import { ProductShowcaseModule } from '../../shared/product-showcase/product-showcase.module';

@NgModule({
  declarations: [EditProductComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    ProductShowcaseModule,
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
})
export class EditProductModule {}
