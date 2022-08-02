import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-app-routing.module';

import { SideBarModule } from './shared/side-bar/side-bar.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { UserAppComponent } from './user-app.component';
import { ModalModule } from './shared/modal/modal.module';
import { CommonModule } from '@angular/common';
import { LoginModule } from './header/login/login.module';
import { MatButtonModule } from '@angular/material/button';
import { SignupModule } from './header/signup/signup.module';
import { SignupPromoModule } from './header/signup-promo/signup-promo.module';
import { LoginPromoModule } from './header/login-promo/login-promo.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from './shared/loader-factory';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UserAppComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FooterModule,
    HeaderModule,
    HomeModule,
    MatButtonModule,
    FlexLayoutModule,
    ModalModule,
    LoginModule,
    SignupModule,
    SignupPromoModule,
    LoginPromoModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: UserAppComponent,
      },
    ]),
  ],
  exports: [SideBarModule],
})
export class UserModule {}
