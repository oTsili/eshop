import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressbookModule } from './addressbook/addressbook.module';
import { OrdersModule } from './orders/orders.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AddressbookModule,
    OrdersModule,
    ProfileModule,
    WishlistModule,
    AccountRoutingModule,
  ],
})
export class ProfileModule {}
