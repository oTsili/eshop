import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserAppService {
  modalListener = new Subject<void>();

  getModalListener() {
    return this.modalListener.asObservable();
  }

  onToggleModal() {
    this.modalListener.next();
  }
}
