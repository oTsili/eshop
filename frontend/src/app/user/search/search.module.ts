import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { SideBarModule } from '../shared/side-bar/side-bar.module';
import { SearchRoutingModule } from './search-routing.module';
import { ProductsModule } from '../shared/products/products.module';
// import { ProductsModule } from '../products/products.module'

import { ResponsiveCatalogModule } from '../shared/NOT-USED-responsive-catalog/responsive-catalog.module';
import { CatalogModule } from '../shared/NOT-USED-catalog/catalog.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ProductsModule,
    ReactiveFormsModule,
    SideBarModule,
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
