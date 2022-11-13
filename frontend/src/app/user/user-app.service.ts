import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserAppService {
  modalListener = new Subject<boolean>();
  messageListener = new Subject<string>();
  headerListener = new Subject<boolean>();

  getHeaderListener() {
    return this.headerListener.asObservable();
  }

  onDisableHeaderAndFooter(header_simple: boolean) {
    this.headerListener.next(header_simple);
  }

  getModalListener() {
    return this.modalListener.asObservable();
  }

  onToggleModal(withWarning = false) {
    this.modalListener.next(withWarning);
  }

  getMessageListener() {
    return this.messageListener.asObservable();
  }

  onMessageUpdate(message: string) {
    this.messageListener.next(message);
  }
}
