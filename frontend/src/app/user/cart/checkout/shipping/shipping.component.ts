import { Component, OnInit } from '@angular/core';
import { Account, CartItem } from 'src/app/user/account/account.interfaces';
import { AccountService } from 'src/app/user/account/account.service';
import { User } from 'src/app/user/header/signup/signup.interfaces';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  account: Account;
  subtotal: number;
  total: number;
  shipping: number;
  cart: CartItem[];

  constructor(
    private checkoutService: CheckoutService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getUserAccount();
  }

  triggerRouterOutletActivate(activeRoute: string) {
    this.checkoutService.onRouterOutletUpdate(activeRoute);
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
            console.log({ myAccount: response });
            this.account = response.account;

            if (this.account && this.account.cart)
              this.cart = this.account.cart;

            this.subtotal = 0;
            for (let cart_product of this.cart) {
              this.subtotal +=
                cart_product.product.price * cart_product.quantity;
            }
            console.log(this.subtotal);

            if (this.shipping) {
              this.total = this.shipping + this.subtotal;
            } else {
              this.total = this.subtotal;
            }
          },
        });
    }
  }
}
