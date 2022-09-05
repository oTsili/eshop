import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableRowDirectivesModule } from 'src/app/admin/trade-numbers/directives/table-row-directives.module';
import { SuppliersRowComponent } from './suppliers-row.component';

@NgModule({
  declarations: [SuppliersRowComponent],
  imports: [CommonModule, TableRowDirectivesModule, FormsModule],
  exports: [SuppliersRowComponent],
})
export class SuppliersRowModule {}
