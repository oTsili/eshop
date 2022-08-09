import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from '../header/test/test.component';
import { HomeComponent } from './home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const homeRoutes: Routes = [
  {
    path: '',
    // component: HomeComponent,

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
