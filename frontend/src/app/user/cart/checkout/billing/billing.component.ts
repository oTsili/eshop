import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Account, CartItem } from 'src/app/user/account/account.interfaces';
import { AccountService } from 'src/app/user/account/account.service';
import { WhishlistService } from 'src/app/user/account/wishlist/whishlist.service';
import { User } from 'src/app/user/header/signup/signup.interfaces';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements AfterViewInit, OnInit {
  @ViewChild('paypalRef', { static: true }) private paypalRef: ElementRef;
  account: Account;
  subtotal: number;
  total: number;
  shipping: number;
  cart: CartItem[];
  isVisible = false;

  constructor(
    private accountService: AccountService,
    private whishlistService: WhishlistService,
    private cartService: CartService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    console.log(window.paypal);
    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'black',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  // value: '1000',
                  value: this.total,
                  // currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            // alert('Transaction completed');
            this.isVisible = true;

            this.deleteFromWhishlistAndCart();

            this.router.navigate(['/home/search']);
          });
        },
        onError: (error) => {
          console.log(error);
        },
      })
      .render(this.paypalRef.nativeElement);
  }

  ngOnInit(): void {
    this.getUserAccount();
  }

  getUserAccount() {
    // get user basic info from the browser's storage
    let userString = localStorage.getItem('user');
    if (userString) {
      // convert to object from string
      let user: User = JSON.parse(userString);
      if (user.id)
        // get the account from the db
        this.accountService.getAccount(user.id).subscribe({
          next: (response) => {
            this.account = response.account;

            if (this.account && this.account.cart)
              this.cart = this.account.cart;

            this.subtotal = 0;
            for (let cart_product of this.cart) {
              this.subtotal +=
                cart_product.product.price * cart_product.quantity;
            }

            if (this.shipping) {
              this.total = this.shipping + this.subtotal;
            } else {
              this.total = this.subtotal;
            }
          },
        });
    }
  }

  closeInfoMessage() {
    const infoMessage =
      this.elementRef.nativeElement.querySelector('.info.message');
    this.renderer.setStyle(infoMessage, 'display', 'none');
  }

  deleteFromWhishlist(id: string) {
    this.whishlistService.deleteWhishlistItem(id).subscribe({
      next: (response) => {
        this.accountService.onUpdateAccount();
      },
    });
  }

  deleteFromCart(id: string) {
    this.cartService.deleteCartItem(id).subscribe({
      next: (response) => {
        this.accountService.onUpdateAccount();
      },
    });
  }

  deleteFromWhishlistAndCart() {
    if (this.account.whishlist && this.account.cart)
      for (let whishlistItem of this.account.whishlist) {
        for (let cartItem of this.account.cart) {
          if (cartItem.product._id === whishlistItem.product._id) {
            if (cartItem._id) this.deleteFromCart(cartItem._id);
            if (whishlistItem._id) this.deleteFromWhishlist(whishlistItem._id);
          }
        }
      }
  }
}
