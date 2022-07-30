import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignupAuthData, UserAttrs } from './signup.interfaces';

const BACKEND_URL = environment.BASE_URL + 'user';

@Injectable({ providedIn: 'root' })
export class SignupService {
  submitListener = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  getSubmitListener() {
    return this.submitListener.asObservable();
  }

  onSubmit() {
    this.submitListener.next();
  }

  createUser(signupAuthData: SignupAuthData) {
    const authData = new FormData();
    authData.append('email', signupAuthData.email);
    authData.append('firstName', signupAuthData.firstName);
    authData.append('lastName', signupAuthData.lastName);
    authData.append('signupDate', signupAuthData.signupDate);
    authData.append('password', signupAuthData.password);
    authData.append('passwordConfirm', signupAuthData.passwordConfirm);

    this.httpClient
      .post<{ existingUser: UserAttrs; expiresIn: string }>(
        `${BACKEND_URL}/signup`,
        authData,
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((userData) => {
          console.log(userData);
          return userData;
        })
      )
      .subscribe(
        {
          next: (c) => {
            console.log(c);
          },
        }
        // (data) => {
        //   this.authStatusListener.next(true);
        //   this.router.navigate(['/']);
        //   let duration = parseInt(data.expiresIn);
        //   this.setAuthTimer(duration);
        //   const now = new Date();
        //   const expirationDate = new Date(now.getTime() + duration * 1000);
        //   this.saveToStorage(expirationDate);
        // },
        // (error) => {
        //   this.authStatusListener.next(false);
        // }
      );
  }
}
