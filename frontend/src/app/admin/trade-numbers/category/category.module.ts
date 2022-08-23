import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableRowDirectivesModule } from '../directives/table-row-directives.module';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, ReactiveFormsModule, TableRowDirectivesModule],
  exports: [CategoryComponent],
})
export class CategoryModule {}
