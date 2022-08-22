import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { enableFormDirective } from './enable-form-control.directive';
import { TableRowContentDirective } from './table-row-content.directive';
import { TableRowDirective } from './table-row.directive';

@NgModule({
  declarations: [
    TableRowDirective,
    TableRowContentDirective,
    enableFormDirective,
  ],
  imports: [CommonModule],
  exports: [TableRowDirective, TableRowContentDirective, enableFormDirective],
})
export class TableRowDirectivesModule {}
