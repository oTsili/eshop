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
    children: [
      {
        path: '',
        redirectTo: 'profile',
      },
      {
        path: 'addressbook',
        component: AddressbookComponent,
        // loadChildren: () =>
        //   import('./addressbook/addressbook.module').then(
        //     (m) => m.AddressbookModule
        //   ),
        // data: {
        //   title: 'addressbook',
        //   breadcrumb: [
        //     {
        //       label: 'addressbook',
        //       url: 'addressbook',
        //     },
        //   ],
        // },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        // loadChildren: () =>
        //   import('./orders/orders.module').then((m) => m.OrdersModule),
        // data: {
        //   title: 'orders',
        //   breadcrumb: [
        //     {
        //       label: 'orders',
        //       url: 'orders',
        //     },
        //   ],
        // },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        // loadChildren: () =>
        //   import('./profile/profile.module').then((m) => m.ProfileModule),
        // data: {
        //   title: 'profile',
        //   breadcrumb: [
        //     {
        //       label: 'profile',
        //       url: 'profile',
        //     },
        //   ],
        // },
      },
      {
        path: 'whishlist',
        component: WishlistComponent,
        // loadChildren: () =>
        //   import('./wishlist/wishlist.module').then((m) => m.WishlistModule),
        // data: [
        //   {
        //     title: 'whishlist',
        //     breadcrumb: [
        //       {
        //         label: 'whishlist',
        //         url: 'whishlist',
        //       },
        //     ],
        //   },
        // ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accoutRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
