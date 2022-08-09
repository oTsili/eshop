import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: 'contact',
    component: TestComponent,
    data: {
      title: 'contact',
      breadcrumb: [
        {
          label: 'contact',
          url: 'contact',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderRoutingModule {}
