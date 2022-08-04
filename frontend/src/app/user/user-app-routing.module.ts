import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './header/test/test.component';
import { UserAppComponent } from './user-app.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserAppComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'contact',
        component: TestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
