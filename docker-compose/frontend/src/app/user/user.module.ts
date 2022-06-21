import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from './shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SubNavComponent } from './header/sub-nav/sub-nav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SubNavComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SubNavComponent,
  ],
})
export class UserModule {}
