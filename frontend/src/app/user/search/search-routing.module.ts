import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';

export const searchRoutes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: '',
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
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
