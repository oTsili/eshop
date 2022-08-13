import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Account,
  WhishlistItem,
} from 'src/app/user/account/account.interfaces';
import { User } from 'src/app/user/header/signup/signup.interfaces';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + 'user';

@Injectable({ providedIn: 'root' })
export class CatalogDetailsService {
  constructor(private httpClient: HttpClient) {}

  addtoWhishlist(userId: string, account: Account) {
    return this.httpClient.put<{ user: User }>(
      `${BACKEND_URL}/${userId}`,
      { account },
      { withCredentials: true }
    );
  }
}
