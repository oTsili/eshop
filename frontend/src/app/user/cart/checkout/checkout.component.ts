import { Component, OnInit } from '@angular/core';
import { UserAppService } from '../../user-app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(private userAppService: UserAppService) {}

  ngOnInit(): void {
    this.userAppService.onDisableHeaderAndFooter(true);
  }
}
