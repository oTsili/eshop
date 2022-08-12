import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CatalogDetailsComponent } from './catalog-details.component';

@NgModule({
  declarations: [CatalogDetailsComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [CatalogDetailsComponent],
})
export class CatalogDetailsModule {}
