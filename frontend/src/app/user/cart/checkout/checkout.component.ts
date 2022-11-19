import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb.interfaces';
import { BreadcrumbService } from '../../shared/breadcrumb/breadcrumb.service';
import { UserAppService } from '../../user-app.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  pageHeader: string;
  breadcrumbItems: Breadcrumb[];
  active_route: string;

  constructor(
    private userAppService: UserAppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.userAppService.onDisableHeaderAndFooter(true);
    this.initializeBreadcrumbs();

    this.checkoutService.getRouterOutletListener().subscribe({
      next: (response) => {
        this.getActiveRoute(response);
      },
    });

    // this.activatedRoute.url.subscribe((url) => {
    //   console.log(url);
    //   console.log(
    //     this.activatedRoute.firstChild?.data.subscribe((data: Data) => {
    //       console.log(data);
    //     })
    //   );
    // });

    // this.activatedRoute.firstChild?.data.subscribe((data: Data) => {
    //   console.log(data);
    //   this.active_route = data['title'];
    // });

    // console.log(this.activatedRoute);

    this.getActiveRoute();
  }

  getActiveRoute(activateRoute?: string) {
    const routes = this.router.url.split('/');
    if (!activateRoute) {
      this.active_route = routes[routes.length - 1];
    } else {
      this.active_route = activateRoute;
    }
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
