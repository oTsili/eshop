import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignupAuthData, UserAttrs } from '../header/signup/signup.interfaces';

const BACKEND_URL = environment.BASE_URL + 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedListener = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<{ existingUser: UserAttrs; expiresIn: string }>(
        `${BACKEND_URL}/login`,
        { username: email, password },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.onUpdateAuthStatus(true);
        })
      )
      .pipe(
        map((userData) => {
          console.log({ userData });
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
          this.onUpdateAuthStatus(false);
        })
      )
      .pipe(
        map((userData) => {
          console.log({ userData });
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
      .post<{ existingUser: UserAttrs; expiresIn: string }>(
        `${BACKEND_URL}/signup`,
        authData,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.onUpdateAuthStatus(true);
        })
      )
      .pipe(
        map((userData) => {
          console.log({ userData });
          return userData;
        })
      );
  }

  getAuthStatusListener() {
    return this.authenticatedListener.asObservable();
  }

  onUpdateAuthStatus(status: boolean) {
    this.authenticatedListener.next(status);
  }

  isAuthenticated() {
    return this.httpClient.get<boolean>(`${BACKEND_URL}/isAuth`, {
      withCredentials: true,
    });
  }
}
