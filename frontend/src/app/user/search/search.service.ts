import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private languageChangeListener = new Subject<string>();

  getLanguageChangeListener() {
    return this.languageChangeListener.asObservable();
  }

  onLanguageChange(lang: string) {
    this.languageChangeListener.next(lang);
  }
}
