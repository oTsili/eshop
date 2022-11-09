import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TestComponent } from '../header/test/test.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const homeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchModule),
        data: {
          title: 'search',
          breadcrumb: [
            {
              label: 'Search',
              url: 'search',
            },
          ],
        },
      },
      {
        path: 'account',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('../account/account.module').then((m) => m.AccountModule),
        data: {
          title: 'account',
          breadcrumb: [
            {
              label: 'account',
              url: 'account',
            },
          ],
        },
      },
      {
        path: 'cart',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('../cart/cart.module').then((m) => m.CartModule),
        data: {
          title: 'cart',
          breadcrumb: [
            {
              label: 'cart',
              url: 'cart',
            },
          ],
        },
      },

      {
        path: 'contact',
        component: TestComponent,
        data: {
          title: 'contact',
          breadcrumb: [
            {
              label: 'Contact',
              url: 'contact',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
