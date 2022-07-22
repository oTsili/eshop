import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';

import { SideBarModule } from './shared/side-bar/side-bar.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { UserAppComponent } from './user-app.component';
import { ModalModule } from './shared/modal/modal.module';
import { CommonModule } from '@angular/common';
import { LoginModule } from './header/login/login.module';

@NgModule({
  declarations: [UserAppComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FooterModule,
    HeaderModule,
    HomeModule,
    ModalModule,
    LoginModule,
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
