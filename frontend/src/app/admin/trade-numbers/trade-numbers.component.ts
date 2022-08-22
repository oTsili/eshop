import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TradeNumbersService } from './trade-numbers.service';

@Component({
  selector: 'app-trade-numbers',
  templateUrl: './trade-numbers.component.html',
  styleUrls: ['./trade-numbers.component.scss'],
})
export class TradeNumbersComponent implements OnInit {
  styleForm: FormGroup;
  typeForm: FormGroup;
  colorsForm: FormGroup;
  seasonForm: FormGroup;
  isLoading = false;
  trade_numbers;

  constructor(private tradeNumbersService: TradeNumbersService) {}

  ngOnInit(): void {
    this.getTradeNumbers();

    this.styleForm = new FormGroup({
      style_description: new FormControl(null, {}),
      style_code: new FormControl(null, {}),
    });
  }

  onSubmit(form: FormGroup) {}

  getTradeNumbers() {
    this.tradeNumbersService.getTradeNumbers().subscribe({
      next: (response) => {
        console.log(response);
        this.trade_numbers = response;
      },
    });
  }

  deleteRow(style) {}
}
