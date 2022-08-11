import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AddressbookComponent } from './addressbook/addressbook.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const accoutRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
      },
      {
        path: 'addressbook',
        component: AddressbookComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'whishlist',
        component: WishlistComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accoutRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
