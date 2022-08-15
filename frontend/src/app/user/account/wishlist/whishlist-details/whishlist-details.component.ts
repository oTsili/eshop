import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Account, CartItem, WhishlistItem } from '../../account.interfaces';
import { User } from '../../../header/signup/signup.interfaces';
import { WhishlistDetailsService } from './whishlist-details.service';
import { AccountService } from '../../account.service';
import { WhishlistService } from '../whishlist.service';

@Component({
  selector: 'app-whishlist-details',
  templateUrl: './whishlist-details.component.html',
  styleUrls: ['./whishlist-details.component.css'],
})
export class WhishlistDetailsComponent implements OnInit, OnChanges {
  @Input() account: Account;
  @Input() isAuthenticated = false;
  @Input() whishlistItem: WhishlistItem;
  oldPrice: number;
  quantity: number;

  constructor(
    private whishlistService: WhishlistService,
    private whishlistDetailsService: WhishlistDetailsService,
    private appService: AppService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    if (this.whishlistItem.quantity)
      this.quantity = this.whishlistItem.quantity;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account']) this.account = changes['account'].currentValue;

    if (changes['whishlistItem'])
      this.whishlistItem = changes['whishlistItem'].currentValue;

    if (changes['isAuthenticated'])
      this.isAuthenticated = changes['isAuthenticated'].currentValue;

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
    console.log(form);
    // if user id is available
    console.log({ authenticated: this.isAuthenticated });
    if (this.isAuthenticated) {
      // get the user id
      let userString = localStorage.getItem('user');
      let user: User;
      if (userString) {
        user = JSON.parse(userString);
        if (user && user.id) {
          // compose the cartItem object
          const cartItem: CartItem = {
            user: user.id,
            date: this.appService.getDateString(),
            product: this.whishlistItem.product,
            quantity: this.quantity,
          };
          // http requetst to add the cart item to the db
          this.whishlistDetailsService.addtoCart(cartItem).subscribe({
            next: (response) => {
              console.log({ cartAdd: response });
              this.accountService.onUpdateAccount();
            },
            error: (response) => {
              console.log('cart update was not possible');
            },
          });
        }
      } else {
        console.log('please login first');
      }
    }
  }

  deleteWhishlistItem(id) {
    this.whishlistService.deleteWhishlistItem(id).subscribe({
      next: (response) => {
        console.log({ response });
        this.accountService.onUpdateAccount();
      },
    });
  }
}
