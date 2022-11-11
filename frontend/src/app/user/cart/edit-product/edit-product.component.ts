import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartItem } from '../../account/account.interfaces';
import { Product } from '../../product/product.interface';
import { ProductsService } from '../../product/products.service';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb.interfaces';
import { BreadcrumbService } from '../../shared/breadcrumb/breadcrumb.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  pageHeader: string;
  breadcrumbItems: Breadcrumb[];
  product_id: string;
  product: Product;
  cart_item: CartItem;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const cart_item_id = params['cart_item_id'];
      this.product_id = params['product_id'];

      console.log(params);
      console.log(params['cart_item_id']);

      this.cartService.getCartItem(cart_item_id).subscribe({
        next: (response) => {
          console.log(response);
          this.cart_item = response;
        },
      });

      // this.productService.getProduct(params['product_id']).subscribe({
      //   next: (response) => {
      //     console.log(response);
      //     this.product = response;
      //   },
      // });
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
