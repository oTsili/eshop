import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PanelsService {
  private isCollapsedListener = new BehaviorSubject<boolean>(false);

  getIsCollapsedListener() {
    return this.isCollapsedListener.asObservable();
  }

  onUpdateCollapse(collapse: boolean) {
    this.isCollapsedListener.next(collapse);
  }
}
