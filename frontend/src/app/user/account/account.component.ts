import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '../shared/breadcrumb/breadcrumb.interfaces';
import { BreadcrumbService } from '../shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  breadcrumbItems: Breadcrumb[];
  pageHeader: string;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeBreadcrumbs();
  }

  initializeBreadcrumbs() {
    // get each intermediate route from the url
    let routes = this.router.url.split('/');
    // delete the first (which is an empty string)
    routes.shift();
    // ths last route becomes the page header
    this.pageHeader = routes[routes.length - 1];

    // get an array of Breadcrumb items from the routes above
    this.breadcrumbItems = this.breadcrumbService.getBreadcrumbs(
      routes,
      this.router.url
    );
  }

  updateBreadcrumbs(event: string) {
    // udate the page header
    this.pageHeader = event;
    // save temporarily the old breadcrumb
    const breadcrumb = this.breadcrumbItems[this.breadcrumbItems.length - 1];
    // update the last breadcrumb (of the navigated route)
    this.breadcrumbItems[this.breadcrumbItems.length - 1].url =
      breadcrumb.url.replace(breadcrumb.text, event);
    this.breadcrumbItems[this.breadcrumbItems.length - 1].text = event;
  }
}
