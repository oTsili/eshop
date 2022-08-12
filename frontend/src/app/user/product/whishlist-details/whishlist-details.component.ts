import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { WhishlistItem } from '../../account/account.interfaces';
import { User } from '../../header/signup/signup.interfaces';
import { Product } from '../product.interface';
import { WhishlistDetailsService } from './whishlist-details.service';

@Component({
  selector: 'app-whishlist-details',
  templateUrl: './whishlist-details.component.html',
  styleUrls: ['./whishlist-details.component.css'],
})
export class WhishlistDetailsComponent implements OnInit, OnChanges {
  @Input() whishlistItem: WhishlistItem;
  oldPrice: number;
  quantity: number;
  user: User;

  constructor(
    private whishlistDetailsService: WhishlistDetailsService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.quantity = this.whishlistItem.quantity;
    this.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.whishlistItem.product = changes['product'].currentValue;
    }

    // compute the pre-sales(old) price from the sales percentage
    this.oldPrice =
      parseInt(this.whishlistItem.product.price) +
      parseInt(this.whishlistItem.product.price) *
        (parseInt(this.whishlistItem.product.sales) / 100);
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getUser() {
    const strUser = localStorage.getItem('user');
    if (strUser) {
      this.user = JSON.parse(strUser);
    }
  }

  onUpdateWhishlist() {
    const product = this.whishlistItem.product;

    if (this.user) {
      const whishlist = this.user.account.whishlist;

      whishlist?.push({
        product: product._id,
        quantity: this.quantity,
        date: this.appService.getDateString(),
      });
      const account = {
        whishlist,
      };

      this.whishlistDetailsService
        .submitWhishlistItem(this.user._id!, account)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
        });
    }
  }

  onSubmitCart(form: NgForm) {
    // console.log(form);
    const product = this.whishlistItem.product;

    if (this.user) {
      let cart = this.user.account.cart;

      if (!cart) {
        cart = [];
      }

      cart.push({
        product: product._id,
        quantity: this.quantity,
        date: this.appService.getDateString(),
      });
      const account = {
        cart,
      };

      this.whishlistDetailsService
        .submitWhishlistItem(this.user._id!, account)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
        });
    }
  }
}
