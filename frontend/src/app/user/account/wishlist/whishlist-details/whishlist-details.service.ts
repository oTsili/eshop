import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../account.interfaces';
import { User } from '../../../header/signup/signup.interfaces';

const BACKEND_URL = environment.BASE_URL + '/cart';

@Injectable({ providedIn: 'root' })
export class WhishlistDetailsService {
  constructor(private httpClient: HttpClient) {}

  addtoCart(cartItem: CartItem) {
    return this.httpClient.post<{ user: User }>(
      `${BACKEND_URL}`,
      { cartItem },
      { withCredentials: true }
    );
  }
}
