import { Injectable } from '@angular/core';
import { PanelItem } from '../../shared/accordion/host-panel/host-panel-item.class';
import { FormComponent } from './form/form.component';
import { TaxShippingComponent } from './tax-shipping.component';

@Injectable({ providedIn: 'root' })
export class TaxShippingService {
  getAccordionPanels() {
    return [
      new PanelItem(FormComponent, {
        header: 'tax and shipping estimation',
        // elementList: [
        //   { text: 'red' },
        //   { text: 'blue' },
        //   { text: 'green' },
        //   { text: 'white' },
        //   { text: 'beige' },
        //   { text: 'brown' },
        //   { text: 'yellow' },
        //   { text: 'pink' },
        //   { text: 'mocha' },
        //   { text: 'purple' },
        //   { text: 'orange' },
        // ],
        // comp: 'Brave as they come',
      }),
    ];
  }
}
