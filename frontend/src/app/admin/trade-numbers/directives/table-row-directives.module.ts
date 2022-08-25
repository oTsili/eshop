import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnableFormDirective } from './enable-form-control.directive';
import { TableRowContentDirective } from './table-row-content.directive';
import { TableRowHeaderDirective } from './table-row-header.directiv';
import { TableRowDirective } from './table-row.directive';

@NgModule({
  declarations: [
    TableRowDirective,
    TableRowContentDirective,
    EnableFormDirective,
    TableRowHeaderDirective,
  ],
  imports: [CommonModule],
  exports: [TableRowDirective, TableRowContentDirective, EnableFormDirective],
})
export class TableRowDirectivesModule {}
