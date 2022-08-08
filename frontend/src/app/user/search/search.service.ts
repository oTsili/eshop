import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchQueryHeaderListener = new Subject<string>();

  getSearchQueryHeaderListener() {
    return this.searchQueryHeaderListener.asObservable();
  }

  onUpdateSearchQueryHeader(query: string) {
    this.searchQueryHeaderListener.next(query);
  }
}
