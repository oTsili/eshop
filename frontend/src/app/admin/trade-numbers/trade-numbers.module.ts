import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeNumbersComponent } from './trade-numbers.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { ReactiveFormsModule } from '@angular/forms';
import { StyleCategoryModule } from './style-category/style-category.module';
import { TableRowDirectivesModule } from './directives/table-row-directives.module';
import { TableRowModule } from './table-row/table-row.module';

@NgModule({
  declarations: [TradeNumbersComponent],
  imports: [
    CommonModule,
    TableRowModule,
    StyleCategoryModule,
    TableRowDirectivesModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  // exports: [],
})
export class TradeNumbersModule {}
