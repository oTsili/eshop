import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { WhishlistItem } from '../../account.interfaces';
import { User } from '../../../header/signup/signup.interfaces';
import { WhishlistDetailsService } from './whishlist-details.service';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-whishlist-details',
  templateUrl: './whishlist-details.component.html',
  styleUrls: ['./whishlist-details.component.css'],
})
export class WhishlistDetailsComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() whishlistItem: WhishlistItem;
  oldPrice: number;
  quantity: number;

  constructor(
    private whishlistDetailsService: WhishlistDetailsService,
    private appService: AppService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.quantity = this.whishlistItem.quantity;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = changes['user'].currentValue;
    this.whishlistItem = changes['whishlistItem'].currentValue;

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

  onSubmitCart(form: NgForm) {
    // console.log(form);
    const product = this.whishlistItem.product;

    if (this.user && this.user.account) {
      let cart = this.user.account.cart;

      if (!cart) {
        cart = [];
      }

      cart.push({
        product: product._id,
        quantity: this.quantity,
        date: this.appService.getDateString(),
      });

      this.user.account.cart = cart;

      this.whishlistDetailsService
        .addtoCart(this.user._id!, this.user.account)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
        });
    }
  }
}
