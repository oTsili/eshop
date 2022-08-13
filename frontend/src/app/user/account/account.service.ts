import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../header/signup/signup.interfaces';

const BACKEND_URL = environment.BASE_URL + 'user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private prLocaclUser: User;
  private authStatusListener = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient) {}

  set localUser(user: User) {
    this.prLocaclUser = user;
  }

  get localUser() {
    return this.prLocaclUser;
  }

  getauthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  onUpdateAuthStatus(user: User) {
    this.authStatusListener.next(user);
  }

  getUser(email: string) {
    return this.httpClient.get<{ user: User }>(`${BACKEND_URL}/${email}`, {
      withCredentials: true,
    });
  }
}
