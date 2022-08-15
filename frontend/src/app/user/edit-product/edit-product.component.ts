import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '../shared/breadcrumb/breadcrumb.interfaces';
import { BreadcrumbService } from '../shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  pageHeader: string;
  breadcrumbItems: Breadcrumb[];

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {}

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
