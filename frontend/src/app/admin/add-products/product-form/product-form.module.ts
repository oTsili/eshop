import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { MatButtonModule } from '@angular/material/button';
import { ToggleOptionsDirective } from '../directives/toggle-options.directive';
import { SelectOptionDirective } from '../directives/select-option.directive';
import { MultipleSelectOption } from '../directives/multiple-select-option.directive';

@NgModule({
  declarations: [
    ProductFormComponent,
    ToggleOptionsDirective,
    SelectOptionDirective,
    MultipleSelectOption,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // MatInputModule,
    // MatButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [ProductFormComponent],
})
export class ProductFormModule {}
