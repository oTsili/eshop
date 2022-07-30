import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { navBarElement } from './header.interfaces';

const BACKEND_URL = environment.BASE_URL + 'navbar';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private languageChangeListener = new Subject<string>();
  private selectedLang: string;

  constructor(private httpClient: HttpClient) {}

  set selectedLanguage(language: string) {
    this.selectedLang = language;
  }

  get selectedLanguage() {
    return this.selectedLang;
  }

  getLanguageChangeListener() {
    return this.languageChangeListener.asObservable();
  }

  onLanguageChange(lang: string) {
    this.languageChangeListener.next(lang);
  }

  getNavBarElements() {
    return this.httpClient
      .get<any>(`${BACKEND_URL}`, {
        withCredentials: true,
      })
      .pipe(
        map((data) => {
          return { navBarElement: this.sortArr(data.navBarElement) };
        })
      );
  }

  sortArr(array: navBarElement[]) {
    array.sort((a, b) => {
      return a.position! - b.position!;
    });

    return array;
  }

  onTest() {
    const authData = new FormData();

    this.httpClient
      .post(`${environment.BASE_URL}user/test`, authData, {
        withCredentials: true,
      })
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
