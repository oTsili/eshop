import { Injectable } from '@angular/core';
import { PanelItem } from 'src/app/user/shared/accordion/host-panel/host-panel-item.class';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@Injectable({ providedIn: 'root' })
export class OrderAccordionService {
  getAccordionPanels() {
    return [new PanelItem(OrderSummaryComponent, { header: 'summary' })];
  }
}
