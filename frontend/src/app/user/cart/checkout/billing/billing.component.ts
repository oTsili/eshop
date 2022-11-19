import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  @ViewChild('paypalRef', { static: true }) private paypalRef: ElementRef;

  ngOnInit(): void {
    console.log(window.paypal);
    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'black',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '1000',
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Transaction completed');
          });
        },
        onError: (error) => {
          console.log(error);
        },
      })
      .render(this.paypalRef.nativeElement);
  }
}
