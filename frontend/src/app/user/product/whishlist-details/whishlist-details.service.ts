import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../../account/account.interfaces';
import { User } from '../../header/signup/signup.interfaces';

const BACKEND_URL = environment.BASE_URL + 'user';

@Injectable({ providedIn: 'root' })
export class WhishlistDetailsService {
  constructor(private httpClient: HttpClient) {}

  submitWhishlistItem(userId: string, account: Account) {
    return this.httpClient.put<{ user: User }>(
      `${BACKEND_URL}/${userId}`,
      { account },
      { withCredentials: true }
    );
  }
}
