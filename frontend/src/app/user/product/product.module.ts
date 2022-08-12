import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CatalogDetailsComponent } from './catalog-details/catalog-details.component';
import { WhishlistDetailsComponent } from './whishlist-details/whishlist-details.component';

@NgModule({
  declarations: [ProductComponent, CatalogDetailsComponent, WhishlistDetailsComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ProductComponent],
})
export class ProductModule {}
