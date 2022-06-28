import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from './shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SubNavComponent } from './header/sub-nav/sub-nav.component';
import { UserAppComponent } from './user-app/user-app.component';
import { SearchComponent } from './search/search.component';
import { SideBarModule } from './shared/side-bar/side-bar.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SubNavComponent,
    UserAppComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    SideBarModule,
    FooterModule,
  ],
  exports: [
    SharedModule,
    HeaderComponent,
    HomeComponent,
    SubNavComponent,
    SearchComponent,
    SideBarModule,
  ],
})
export class UserModule {}
