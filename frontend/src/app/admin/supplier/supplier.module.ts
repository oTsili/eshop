import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductsDirectivesModule } from '../add-products/directives/add-products-directives.module';
import { DragAndDropModule } from '../shared/drag-and-drop/drag-and-drop.module';

@NgModule({
  declarations: [AddSupplierComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddProductsDirectivesModule,
    DragAndDropModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class SupplierModule {}
