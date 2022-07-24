import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserAppService {
  modalListener = new Subject<void>();
  languageChangeListener = new Subject<string>();

  getLanguageChangeListener() {
    return this.languageChangeListener.asObservable();
  }

  onLanguageChange(lang: string) {
    this.languageChangeListener.next(lang);
  }

  getModalListener() {
    return this.modalListener.asObservable();
  }

  onToggleModal() {
    this.modalListener.next();
  }
}
