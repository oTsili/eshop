import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';

const accoutRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AccountComponent,
      },
      {
        path: 'addressbook',
        loadChildren: () =>
          import('./addressbook/addressbook.module').then(
            (m) => m.AddressbookModule
          ),
        data: {
          title: 'addressbook',
          breadcrumb: [
            {
              label: 'addressbook',
              url: 'addressbook',
            },
          ],
        },
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
        data: {
          title: 'orders',
          breadcrumb: [
            {
              label: 'orders',
              url: 'orders',
            },
          ],
        },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
        data: {
          title: 'profile',
          breadcrumb: [
            {
              label: 'profile',
              url: 'profile',
            },
          ],
        },
      },
      {
        path: 'whishlist',
        loadChildren: () =>
          import('./wishlist/wishlist.module').then((m) => m.WishlistModule),
        data: [
          {
            title: 'whishlist',
            breadcrumb: [
              {
                label: 'whishlist',
                url: 'whishlist',
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accoutRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
