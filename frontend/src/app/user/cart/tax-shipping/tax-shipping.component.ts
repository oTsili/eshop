import { Component, OnInit } from '@angular/core';
import { PanelItem } from '../../shared/accordion/host-panel/host-panel-item.class';
import { TaxShippingService } from './tax-shipping.service';

@Component({
  selector: 'app-tax-shipping',
  templateUrl: './tax-shipping.component.html',
  styleUrls: ['./tax-shipping.component.scss'],
})
export class TaxShippingComponent implements OnInit {
  accordionPanels: PanelItem[] = [];

  constructor(private taxShippingService: TaxShippingService) {}

  ngOnInit(): void {
    this.accordionPanels = this.taxShippingService.getAccordionPanels();
    // console.log(this.accordionPanels);
  }
}
