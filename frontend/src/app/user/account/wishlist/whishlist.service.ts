import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../header/signup/signup.interfaces';

const BACKEND_URL = environment.BASE_URL + 'user';

@Injectable({ providedIn: 'root' })
export class WhishlistService {
  constructor(private httpClient: HttpClient) {}

  getUser(email: string) {
    return this.httpClient.get<{ user: User }>(`${BACKEND_URL}/${email}`, {
      withCredentials: true,
    });
  }
}
