import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { SideBarModule } from '../shared/side-bar/side-bar.module';
import { SearchRoutingModule } from './search-routing.module';
// import { ProductsModule } from '../products/products.module'

import { ReactiveFormsModule } from '@angular/forms';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from '../shared/loader-factory';

import { ResponsiveCatalogModule } from '../shared/responsive-catalog/responsive-catalog.module';
import { ProductModule } from '../product/product.module';
import { PaginatorModule } from '../shared/paginator/paginator.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ResponsiveCatalogModule,
    // ProductsModule,
    ProductModule,
    ReactiveFormsModule,
    SideBarModule,
    PaginatorModule,
    BreadcrumbModule,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // ResponsiveCatalogModule,
    // CatalogModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SearchComponent,
      },
    ]),
  ],
  exports: [SearchComponent],
})
export class SearchModule {}
