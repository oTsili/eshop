import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../../product/product.interface';
import { ProductsService } from '../../product/products.service';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb.interfaces';
import { BreadcrumbService } from '../../shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  pageHeader: string;
  breadcrumbItems: Breadcrumb[];
  product: Product;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService // private
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      console.log(params['product_id']);
      this.productService.getProduct(params['product_id']).subscribe({
        next: (response) => {
          console.log(response);
          this.product = response;
        },
      });
    });

    this.initializeBreadcrumbs();
  }

  initializeBreadcrumbs() {
    // get each intermediate route from the url
    let routes = this.router.url.split('/');

    console.log({ routes });
    // delete the first (which is an empty string)
    routes.shift();
    // ths last route becomes the page header
    this.pageHeader = routes[routes.length - 1].split('?')[0];

    // get an array of Breadcrumb items from the routes above
    this.breadcrumbItems = this.breadcrumbService.getBreadcrumbs(
      routes,
      this.router.url
    );
  }
}
