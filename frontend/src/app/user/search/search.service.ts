import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchQueryHeaderListener = new Subject<string>();
  private isOpenErrorMessageListenr = new Subject<boolean>();

  getSearchQueryHeaderListener() {
    return this.searchQueryHeaderListener.asObservable();
  }

  onUpdateSearchQueryHeader(query: string) {
    this.searchQueryHeaderListener.next(query);
  }

  getIsOpenErrorMessageListener() {
    return this.isOpenErrorMessageListenr.asObservable();
  }

  onUpdateIsOpenErrorMessage(isOpen: boolean) {
    this.isOpenErrorMessageListenr.next(isOpen);
  }
}
