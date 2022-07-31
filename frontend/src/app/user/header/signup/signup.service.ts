import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignupService {
  submitListener = new Subject<void>();

  getSubmitListener() {
    return this.submitListener.asObservable();
  }

  onSubmit() {
    this.submitListener.next();
  }
}
