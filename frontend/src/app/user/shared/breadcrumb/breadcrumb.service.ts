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
      // drop and route query parameters
      route = route.split('?')[0];

      // get each route from the url
      let active_route = `${this.appService.getSubstring(
        url,
        '/',
        route
      )}${route}`;

      // create a breadcrumb object with its text and route
      let breadcrumb = {
        text: route,
        url: active_route,
      };

      // save it to the array
      breadcrumbs.push(breadcrumb);
    }

    // retun the array with the breadcrumbs
    return breadcrumbs;
  }
}
