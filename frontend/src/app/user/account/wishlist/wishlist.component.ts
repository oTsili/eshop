import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  authStatusSubscription: Subscription;
  accountSubscription: Subscription;
  isAuthenticated = false;
  account: Account;
  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscribeToAuthStatusAndGetAccount();
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  subscribeToAuthStatusAndGetAccount() {
    /**
     * update the authStatus without reaching out the backend.
     * Mostly for the logout functionality. Next get the account
     * info from the backend
     */
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe({
        next: (response) => {
          console.log({ 'auth update: ': response });
          this.isAuthenticated = response;
          let userString = localStorage.getItem('user');
          if (userString) {
            let user: User = JSON.parse(userString);
            console.log(user);
            if (user.id)
              this.accountService.getAccount(user.id).subscribe({
                next: (response) => {
                  console.log({ my: response });
                  this.account = response.account;

                  if (this.account && this.account.whishlist)
                    this.whishlistItems = this.account.whishlist;
                },
              });
          }
        },
        error: (error) => {
          console.error(error);
          console.log('could not trigger the auth-status listener');
        },
      });
  }
}
