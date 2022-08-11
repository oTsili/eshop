import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { ResponsiveCatalogModule } from '../../shared/responsive-catalog/responsive-catalog.module';
import { ProductModule } from '../../product/product.module';

@NgModule({
  declarations: [WishlistComponent],
  imports: [CommonModule, ResponsiveCatalogModule, ProductModule],
})
export class WishlistModule {}
