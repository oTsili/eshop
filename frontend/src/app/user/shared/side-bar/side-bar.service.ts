import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SideBarService {
  private languageChangeListener = new Subject<string>();

  getLanguageChangeListener() {
    return this.languageChangeListener.asObservable();
  }

  onLaguageChange(lang: string) {
    this.languageChangeListener.next(lang);
  }
}
