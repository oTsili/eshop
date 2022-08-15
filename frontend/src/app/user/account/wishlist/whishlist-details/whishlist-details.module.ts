import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/user/shared/loader-factory';
import { WhishlistDetailsComponent } from './whishlist-details.component';

@NgModule({
  declarations: [WhishlistDetailsComponent],
  imports: [
    CommonModule,
    FormsModule, 
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [WhishlistDetailsComponent],
})
export class WhishlistDetailsModule {}
