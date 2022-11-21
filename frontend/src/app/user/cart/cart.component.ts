import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account, CartItem, Order } from '../account/account.interfaces';
import { AccountService } from '../account/account.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../header/signup/signup.interfaces';
import { PanelItem } from '../shared/accordion/host-panel/host-panel-item.class';
import { Breadcrumb } from '../shared/breadcrumb/breadcrumb.interfaces';
import { BreadcrumbService } from '../shared/breadcrumb/breadcrumb.service';
import { UserAppService } from '../user-app.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  pageHeader: string;
  breadcrumbItems: Breadcrumb[];
  accountSubscription: Subscription;
  cart: CartItem[];
  isAuthenticated = false;
  account: Account;
  subtotal: number;
  total: number;
  shipping: number;
  // quantity: number;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private cartService: CartService,
    private authService: AuthService,
    private accountService: AccountService,
    private userAppService: UserAppService
  ) {}

  ngOnInit(): void {
    this.initializeBreadcrumbs();
    this.subscribeToAccountUpdates();
    this.userAppService.onDisableHeaderAndFooter(false);
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
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

  subscribeToAccountUpdates() {
    /**
     * update the authStatus without reaching out the backend.
     * Mostly for the logout functionality. Next get the account
     * info from the backend
     */
    this.accountSubscription = this.accountService
      .getAccountListener()
      .subscribe({
        next: (response) => {
          // console.log({ account: response });
          // this.isAuthenticated = response;
          // get user basic info from the browser's storage
          let userString = localStorage.getItem('user');
          if (userString) {
            // convert to object from string
            let user: User = JSON.parse(userString);
            if (user.id)
              // get the account from the db
              this.accountService.getAccount(user.id).subscribe({
                next: (response) => {
                  // console.log({ myAccount: response });
                  this.account = response.account;

                  if (this.account && this.account.cart)
                    this.cart = this.account.cart;

                  this.subtotal = 0;
                  for (let cart_product of this.cart) {
                    this.subtotal +=
                      cart_product.product.price * cart_product.quantity;
                  }
                  // console.log(this.subtotal);

                  if (this.shipping) {
                    this.total = this.shipping + this.subtotal;
                  } else {
                    this.total = this.subtotal;
                  }
                },
              });
          }
        },
        error: (error) => {
          console.error(error);
          console.log('could not trigger the account listener');
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

  deleteCartItem(id) {
    this.cartService.deleteCartItem(id).subscribe({
      next: (response) => {
        // console.log(response);
        this.accountService.onUpdateAccount();
      },
    });
  }
}
