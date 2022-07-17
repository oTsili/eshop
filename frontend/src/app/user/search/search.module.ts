import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { SideBarModule } from '../shared/side-bar/side-bar.module';
import { SearchRoutingModule } from './search-routing.module';
import { ProductsModule } from '../shared/products/products.module';
// import { ProductsModule } from '../products/products.module'

import { ReactiveFormsModule } from '@angular/forms';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ProductsModule,
    ReactiveFormsModule,
    SideBarModule,
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

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
