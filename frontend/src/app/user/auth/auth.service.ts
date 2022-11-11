import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../account/account.interfaces';
import { AccountService } from '../account/account.service';
import {
  SignupAuthData,
  User,
  UserAttrs,
} from '../header/signup/signup.interfaces';

const BACKEND_URL = environment.BASE_URL + '/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject(false);
  // private authenticatedListener = new Subject<boolean>();

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<User>(
        `${BACKEND_URL}/login`,
        { username: email, password },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          // inform the observers that the user's account information are now available
          this.onUpdateAuthStatus(true);
          // inform observers about account info availability
          this.accountService.onUpdateAccount();
        })
      )
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }

  logout() {
    return this.httpClient
      .get<void>(`${BACKEND_URL}/logout`, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          // update the isAuthenticated variable with false (LOGOUT)
          // inform the observers that the user's account information are NOT available
          this.onUpdateAuthStatus(false);
        })
      )
      .pipe(
        map((userData) => {
          // console.log({ userData });
          return userData;
        })
      );
  }

  signup(signupAuthData: SignupAuthData) {
    const authData = new FormData();
    authData.append('email', signupAuthData.email);
    authData.append('firstName', signupAuthData.firstName);
    authData.append('lastName', signupAuthData.lastName);
    authData.append('signupDate', signupAuthData.signupDate);
    authData.append('password', signupAuthData.password);
    authData.append('passwordConfirm', signupAuthData.passwordConfirm);

    return this.httpClient
      .post<User>(`${BACKEND_URL}/signup`, authData, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          // inform the observers that the user's account information are now available
          this.onUpdateAuthStatus(true);
          // inform observers about account info availability
          this.accountService.onUpdateAccount();
        })
      )
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }

  // get the listenr which updates the isAuthenticated variable whitout reaching the backend
  getAuthStatusListener() {
    return this.isAuthenticated$.asObservable();
  }

  // update the isAuthenticated variable whitout reaching the backend
  onUpdateAuthStatus(status: boolean) {
    // console.log({ status });
    this.isAuthenticated$.next(status);
  }

  /**
   * @returns User object if isAuthenticated is true or 401 error status
   * if the isAuthenticated is false, after reaching the backend
   */
  isAuthenticated() {
    return this.httpClient
      .get<{
        userId: string;
        email: string;
        account: Account;
      }>(`${BACKEND_URL}/isAuth`, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.onUpdateAuthStatus(true);
        })
      )
      .pipe(
        map((userData) => {
          const user = {
            id: userData.userId,
            email: userData.email,
            account: userData.account,
          };
          // save user info to the browser's storage
          localStorage.setItem('user', JSON.stringify(user));

          return user;
        })
      );
  }
}
