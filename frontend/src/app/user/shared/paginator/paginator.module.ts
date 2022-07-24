import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
// import ngx-translate and the http loader
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PaginatorTranslateService } from './paginator-translate.service';
import { HttpLoaderFactory } from '../loader-factory';
@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    MatPaginatorModule, // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new PaginatorTranslateService();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService],
    },
  ],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
