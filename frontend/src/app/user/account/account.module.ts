import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddressbookModule } from './addressbook/addressbook.module';
import { OrdersModule } from './orders/orders.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { ProfileModule } from './profile/profile.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { SideBarModule } from './side-bar/side-bar.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AddressbookModule,
    OrdersModule,
    ProfileModule,
    WishlistModule,
    AccountRoutingModule,
    SideBarModule,
    BreadcrumbModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: AccountComponent,
      },
    ]),
  ],
})
export class AccountModule {}
