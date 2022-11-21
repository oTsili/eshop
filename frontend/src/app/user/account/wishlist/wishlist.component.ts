import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../header/signup/signup.interfaces';
import { Account, WhishlistItem } from '../account.interfaces';
import { AccountService } from '../account.service';
import { WhishlistService } from './whishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  whishlistItems: WhishlistItem[];
  accountSubscription: Subscription;
  isAuthenticated = false;
  account: Account;
  base_url = environment.BASE_URL;
  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscribeToAccountUpdates();
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
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
                  // console.log({ my: response });
                  this.account = response.account;

                  if (this.account && this.account.whishlist)
                    this.whishlistItems = this.account.whishlist;
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
}
