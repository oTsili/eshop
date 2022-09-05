import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowSuppliersComponent } from './show-suppliers.component';
import { SuppliersRowModule } from './suppliers-row/suppliers-row.module';

@NgModule({
  declarations: [ShowSuppliersComponent],
  imports: [CommonModule, SuppliersRowModule],
  exports: [ShowSuppliersComponent],
})
export class ShowSuppliersModule {}
