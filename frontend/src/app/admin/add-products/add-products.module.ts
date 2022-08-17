import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from './add-products.component';
import { DragAndDropModule } from '../shared/drag-and-drop/drag-and-drop.module';
import { DragAndDropComponent } from '../shared/drag-and-drop/drag-and-drop.component';
import { ProductFormModule } from './product-form/product-form.module';

@NgModule({
  declarations: [AddProductsComponent],
  imports: [CommonModule, DragAndDropModule, ProductFormModule],
  exports: [],
})
export class AddProductsModule {}
