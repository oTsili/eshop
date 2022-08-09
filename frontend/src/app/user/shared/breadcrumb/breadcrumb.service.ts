import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Breadcrumb } from './breadcrumb.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  constructor(private appService: AppService) {}

  getBreadcrumbs(routes: string[], url: string) {
    let breadcrumbs: Breadcrumb[] = [];

    for (let route of routes) {
      let active_route = `${this.appService.getSubstring(
        url,
        '/',
        route
      )}${route}`;
      console.log({ active_route });
      let breadcrumb = {
        text: route,
        url: active_route,
      };
      breadcrumbs.push(breadcrumb);
    }
    console.log(breadcrumbs);
    return breadcrumbs;
  }
}
