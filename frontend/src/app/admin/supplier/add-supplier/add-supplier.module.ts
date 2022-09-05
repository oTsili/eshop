import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { AddProductsDirectivesModule } from '../../add-products/directives/add-products-directives.module';
import { DragAndDropModule } from '../../shared/drag-and-drop/drag-and-drop.module';
import { AddSupplierComponent } from './add-supplier.component';

@NgModule({
  declarations: [AddSupplierComponent],
  imports: [
    CommonModule,
    AddProductsDirectivesModule,
    ReactiveFormsModule,
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
  exports: [AddSupplierComponent],
})
export class AddSupplierModule {}
