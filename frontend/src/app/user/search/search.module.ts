import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SideBarModule } from '../shared/side-bar/side-bar.module';
import { SearchRoutingModule } from './search-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SideBarModule,
    SearchRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SearchComponent,
      },
    ]),
  ],
  exports: [SearchComponent],
})
export class SearchModule {}
