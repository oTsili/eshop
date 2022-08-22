import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableRowDirectivesModule } from '../directives/table-row-directives.module';
import { StyleCategoryComponent } from './style-category.component';

@NgModule({
  declarations: [StyleCategoryComponent],
  imports: [CommonModule, ReactiveFormsModule, TableRowDirectivesModule],
  exports: [StyleCategoryComponent],
})
export class StyleCategoryModule {}
