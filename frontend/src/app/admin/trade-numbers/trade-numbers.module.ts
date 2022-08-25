import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeNumbersComponent } from './trade-numbers.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryModule } from './category/category.module';
import { TableRowDirectivesModule } from './directives/table-row-directives.module';
import { TableRowModule } from './category/table-row/table-row.module';
import { ResponsiveCatalogModule } from 'src/app/user/shared/responsive-catalog/responsive-catalog.module';

@NgModule({
  declarations: [TradeNumbersComponent],
  imports: [
    CommonModule,
    TableRowModule,
    CategoryModule,
    TableRowDirectivesModule,
    ResponsiveCatalogModule,
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
