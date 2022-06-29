import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserAppComponent } from './user-app/user-app.component';
import { SearchComponent } from './search/search.component';
import { SideBarModule } from './shared/side-bar/side-bar.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [UserAppComponent, SearchComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SideBarModule,
    FooterModule,
    HeaderModule,
    HomeModule,
  ],
  exports: [SearchComponent, SideBarModule],
})
export class UserModule {}
