import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryDirective } from './category.directive';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CategoryComponent, CategoryDirective],
  imports: [CommonModule, MatButtonModule],
  exports: [CategoryComponent],
})
export class CategoryModule {}
