import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AccountService } from 'src/app/user/account/account.service';
import { User } from 'src/app/user/header/signup/signup.interfaces';
import { Product } from '../product.interface';
import { CatalogDetailsService } from './catalog-details.service';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.css'],
})
export class CatalogDetailsComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() product: Product;
  oldPrice: number;

  constructor(
    private appService: AppService,
    private catalogDetailsService: CatalogDetailsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['product']) {
      this.product = changes['product'].currentValue;
    }
    if (changes['user']) {
      this.user = changes['user'].currentValue;
    }

    // compute the pre-sales(old) price from the sales percentage
    this.oldPrice =
      parseInt(this.product.price) +
      parseInt(this.product.price) * (parseInt(this.product.sales) / 100);
  }

  onUpdateWhishlist() {
    const product = this.product;
    const user = this.user;

    console.log({ product });
    console.log({ user });

    if (user && user.account) {
      let whishlist = user.account.whishlist;

      if (!whishlist) {
        whishlist = [];
      }

      whishlist.push({
        product: product.id,
        quantity: 1,
        date: this.appService.getDateString(),
      });

      user.account.whishlist = whishlist;

      console.log(whishlist);

      this.catalogDetailsService
        .addtoWhishlist(user._id!, user.account)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
        });
    } else {
      console.log('please login');
    }
  }
}
