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
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        data: {
          title: 'home',
          breadcrumb: [
            {
              label: 'Home',
              url: '',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
