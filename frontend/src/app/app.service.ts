import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  private languageChangeListener = new Subject<string>();
  private selectedLang: string;

  constructor(private http: HttpClient) {}

  getLanguageChangeListener() {
    return this.languageChangeListener.asObservable();
  }

  onLanguageChange(lang: string) {
    this.languageChangeListener.next(lang);
  }

  set selectedLanguage(language: string) {
    this.selectedLang = language;
  }

  get selectedLanguage() {
    return this.selectedLang;
  }
}
