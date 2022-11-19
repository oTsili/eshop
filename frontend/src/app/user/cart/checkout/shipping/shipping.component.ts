import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {}

  triggerRouterOutletActivate(activeRoute: string) {
    this.checkoutService.onRouterOutletUpdate(activeRoute);
  }
}
