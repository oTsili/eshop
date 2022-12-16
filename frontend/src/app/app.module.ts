import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user-app.module';

import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { LocalhostInterceptor } from './user/shared/interceptors/localhost-interceptor';
@NgModule({
  declarations: [AppComponent],
  imports: [
    UserModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LocalhostInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
