import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../header/signup/signup.interfaces';
import { Account, WhishlistItem } from './account.interfaces';

const BACKEND_URL = environment.BASE_URL + '/account';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountListener = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient) {}

  getAccountListener() {
    return this.accountListener.asObservable();
  }

  onUpdateAccount() {
    this.accountListener.next(null);
  }

  getAccount(userId: string) {
    return this.httpClient.get<{ account: Account }>(
      `${BACKEND_URL}/${userId}`,
      {
        withCredentials: true,
      }
    );
  }
}
