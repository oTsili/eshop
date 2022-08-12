import { Component, OnInit } from '@angular/core';
import { User } from '../../header/signup/signup.interfaces';
import { WhishlistItem } from '../account.interfaces';
import { WhishlistService } from './whishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  user: User;
  whishlistItems: WhishlistItem[];
  constructor(private whishlistService: WhishlistService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const user = localStorage.getItem('user');

    if (user) {
      const newUser = JSON.parse(user);
      console.log(newUser);
      this.whishlistService.getUser(newUser.email).subscribe({
        next: (response) => {
          console.log({ response });
          if (response.user.account.whishlist) {
            this.whishlistItems = response.user.account.whishlist;
            console.log(this.whishlistItems);
          }
        },
      });
    }
  }
}
