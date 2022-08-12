import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { ResponsiveCatalogModule } from '../../shared/responsive-catalog/responsive-catalog.module';
import { ProductModule } from '../../product/product.module';
import { WhishlistDetailsModule } from '../../product/whishlist-details/whishlist-details.module';

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    ResponsiveCatalogModule,
    ProductModule,
    WhishlistDetailsModule,
  ],
})
export class WishlistModule {}
