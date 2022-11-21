import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CartItem } from 'src/app/user/account/account.interfaces';
import { PanelItem } from 'src/app/user/shared/accordion/host-panel/host-panel-item.class';
import { OrderAccordionService } from './order-accordion.service';

@Component({
  selector: 'app-order-accordion',
  templateUrl: './order-accordion.component.html',
  styleUrls: ['./order-accordion.component.scss'],
})
export class OrderAccordionComponent implements OnInit, OnChanges {
  accordionPanels: PanelItem[];
  @Input() cart: CartItem[];

  constructor(private orderAccordionService: OrderAccordionService) {}

  ngOnInit(): void {
    this.accordionPanels = this.orderAccordionService.getAccordionPanels();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.cart = changes['cart'].currentValue;
    // console.log(this.cart);
  }
}
