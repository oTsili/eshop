import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';

export const searchRoutes: Routes = [
  {
    path: '',
    redirectTo: 'query',
    pathMatch: 'full',
  },
  {
    path: 'query',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
