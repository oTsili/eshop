import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { TableRowDirectivesModule } from '../directives/table-row-directives.module';
import { TableRowDynamicComponent } from './table-row-dynamic.component';

@NgModule({
  declarations: [TableRowDynamicComponent],
  imports: [
    CommonModule,
    TableRowDirectivesModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TableRowDynamicComponent],
})
export class TableRowDynamicModule {}
