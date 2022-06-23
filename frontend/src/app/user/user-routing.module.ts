import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { UserAppComponent } from './user-app/user-app.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserAppComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
        children: [
          {
            path: ':query',
            redirectTo: 'search/:query',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
  {
    path: 'search/:query',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
