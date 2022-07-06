import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private comps: any[] = [];
  private iHost;

  setComponents(comp) {
    console.log('set');
    this.comps.push(comp);
  }

  get components() {
    console.log('get');
    return this.comps;
  }
  set itemHost(iHost) {
    this.iHost = iHost;
  }

  get itemHost() {
    return this.iHost;
  }
}
