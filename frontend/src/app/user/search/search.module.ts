import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SideBarModule } from '../shared/side-bar/side-bar.module';
import { SearchRoutingModule } from './search-routing.module';
import { RouterModule } from '@angular/router';
import { ProductsModule } from '../shared/products/products.module';
// import { ProductsModule } from '../products/products.module'
;
import { ResponsiveCatalogModule } from '../shared/NOT-USED-responsive-catalog/responsive-catalog.module';
import { CatalogModule } from '../shared/catalog/catalog.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SideBarModule,
    SearchRoutingModule,
    ProductsModule,
    ResponsiveCatalogModule,
    CatalogModule,
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
