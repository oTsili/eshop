import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAttrs } from '../signup/signup.interfaces';
const BACKEND_URL = environment.BASE_URL + 'user';

@Injectable({ providedIn: 'root' })
export class LoginService {
  submitListener = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  getSubmitListener() {
    return this.submitListener.asObservable();
  }

  onSubmit() {
    this.submitListener.next();
  }

  onLogin(email: string, password: string) {
    this.httpClient
      .post<{ existingUser: UserAttrs; expiresIn: string }>(
        `${BACKEND_URL}/login`,
        { username: email, password },
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
      .subscribe({
        next: (c) => {
          console.log(c);
        },
      });
  }
}
