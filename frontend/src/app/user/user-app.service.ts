import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserAppService {
  modalListener = new Subject<void>();
  messageListener = new Subject<string>();

  getModalListener() {
    return this.modalListener.asObservable();
  }

  onToggleModal() {
    this.modalListener.next();
  }

  getMessageListener() {
    return this.messageListener.asObservable();
  }

  onMessageUpdate(message: string) {
    this.messageListener.next(message);
  }
}
