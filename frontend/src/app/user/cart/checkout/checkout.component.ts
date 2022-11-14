import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb.interfaces';
import { BreadcrumbService } from '../../shared/breadcrumb/breadcrumb.service';
import { UserAppService } from '../../user-app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  pageHeader: string;
  breadcrumbItems: Breadcrumb[];
  constructor(
    private userAppService: UserAppService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.userAppService.onDisableHeaderAndFooter(true);
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
}
