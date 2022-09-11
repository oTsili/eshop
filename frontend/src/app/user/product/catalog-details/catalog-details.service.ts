import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Account,
  WhishlistItem,
} from 'src/app/user/account/account.interfaces';
import { User } from 'src/app/user/header/signup/signup.interfaces';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + '/whishlist';

@Injectable({ providedIn: 'root' })
export class CatalogDetailsService {
  constructor(private httpClient: HttpClient) {}

  addtoWhishlist(whishlistItem: WhishlistItem) {
    return this.httpClient.post<{ whishlistItem: WhishlistItem }>(
      `${BACKEND_URL}`,
      { whishlistItem },
      { withCredentials: true }
    );
  }
}
