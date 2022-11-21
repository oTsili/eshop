import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/user/header/signup/signup.interfaces';
import { Account, WhishlistItem } from '../../account/account.interfaces';
import { AccountService } from '../../account/account.service';
import { UserAppService } from '../../user-app.service';
import { Product } from '../product.interface';
import { CatalogDetailsService } from './catalog-details.service';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.css'],
})
export class CatalogDetailsComponent implements OnInit, OnChanges {
  @Input() account: Account;
  @Input() isAuthenticated = false;
  @Input() product: Product;
  oldPrice: number;
  isAddedToWhishlist = false;
  isAddedToCart = false;

  constructor(
    private appService: AppService,
    private userAppService: UserAppService,
    private catalogDetailsService: CatalogDetailsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.product = changes['product'].currentValue;
    }
    if (changes['user']) {
      this.account = changes['account'].currentValue;
    }

    if (this.account?.whishlist && this.account?.whishlist?.length > 0) {
      this.account?.whishlist?.forEach((item) => {
        if (item.product && item.product._id == this.product._id) {
          this.isAddedToWhishlist = true;
        }
      });

      this.account?.cart?.forEach((item) => {
        if (item.product && item.product._id == this.product._id) {
          this.isAddedToCart = true;
        }
      });
    }

    // compute the pre-sales(old) price from the sales percentage
    this.oldPrice =
      parseInt(this.product.price) +
      parseInt(this.product.price) * (parseInt(this.product.sales) / 100);
  }

  onUpdateWhishlist() {
    if (this.isAuthenticated) {
      // get the user id
      let userString = localStorage.getItem('user');
      let user: User;
      if (userString) {
        user = JSON.parse(userString);
        if (user && user.id) {
          const whishlistItem: WhishlistItem = {
            user: user.id,
            date: this.appService.getDateString(),
            product: this.product,
            quantity: 1,
          };

          this.catalogDetailsService.addtoWhishlist(whishlistItem).subscribe({
            next: (response) => {
              // console.log({ addWhishlist: response });
              this.accountService.onUpdateAccount();
              this.isAddedToWhishlist = true;
            },
            error: (response) => {
              console.log('whishlist update was not possible');
            },
          });
        }
      }
    } else {
      // prompt the login modal with error message
      this.userAppService.onToggleModal(true);
      console.log('please login first');
    }
  }

  hasSales(sales: string) {
    return parseInt(sales) > 0;
  }
}
