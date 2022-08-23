import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { TableRowDirectivesModule } from '../directives/table-row-directives.module';
import { TableRowComponent } from './table-row.component';

@NgModule({
  declarations: [TableRowComponent],
  imports: [
    CommonModule,
    FormsModule,
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
  exports: [TableRowComponent],
})
export class TableRowModule {}
