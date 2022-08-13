import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem, Order } from '../account/account.interfaces';
import { AccountService } from '../account/account.service';
import { User } from '../header/signup/signup.interfaces';
import { PanelItem } from '../shared/accordion/host-panel/host-panel-item.class';
import { Breadcrumb } from '../shared/breadcrumb/breadcrumb.interfaces';
import { BreadcrumbService } from '../shared/breadcrumb/breadcrumb.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  pageHeader: string;
  breadcrumbItems: Breadcrumb[];
  authStatusSubscription: Subscription;
  user: User;
  cart: CartItem[];
  // quantity: number;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initializeBreadcrumbs();
    this.getUser();
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

  getUser() {
    this.authStatusSubscription = this.accountService
      .getauthStatusListener()
      .subscribe({
        next: (response) => {
          console.log({ whishlist: response });

          if (response.email) {
            this.accountService.getUser(response.email).subscribe({
              next: (response) => {
                console.log({ cart: response });
                this.user = response.user;
                if (this.user.account && this.user.account.cart) {
                  this.cart = this.user.account.cart;
                }
              },
            });
          }
        },
      });
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
}
