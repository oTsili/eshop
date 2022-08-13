import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../header/signup/signup.interfaces';
import { WhishlistItem } from '../account.interfaces';
import { AccountService } from '../account.service';
import { WhishlistService } from './whishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  user: User;
  whishlistItems: WhishlistItem[];
  authStatusSubscription: Subscription;

  constructor(
    private whishlistService: WhishlistService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  getUser() {
    this.authStatusSubscription = this.accountService
      .getauthStatusListener()
      .subscribe({
        next: (response) => {
          console.log({ whishlist: response });

          if (response.email) {
            this.accountService.getUser(response.email).subscribe({
              next: (response) => {
                console.log({ whishlistItem: response });
                this.user = response.user;
                if (this.user.account && this.user.account.whishlist) {
                  this.whishlistItems = this.user.account.whishlist;
                }
              },
            });
          }
        },
      });
  }
}
