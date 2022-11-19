import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  routerOutletListener = new Subject<string>();

  getRouterOutletListener() {
    return this.routerOutletListener.asObservable();
  }

  onRouterOutletUpdate(activateRoute: string) {
    this.routerOutletListener.next(activateRoute);
  }
}
