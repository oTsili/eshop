import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Account, CartItem } from 'src/app/user/account/account.interfaces';
import { AccountService } from 'src/app/user/account/account.service';
import { User } from 'src/app/user/header/signup/signup.interfaces';

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

  constructor(private accountService: AccountService) {}

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
            alert('Transaction completed');
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
