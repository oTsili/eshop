import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TradeNumbersService } from './trade-numbers.service';

@Component({
  selector: 'app-trade-numbers',
  templateUrl: './trade-numbers.component.html',
  styleUrls: ['./trade-numbers.component.css'],
})
export class TradeNumbersComponent implements OnInit {
  theTradeNumberForm: FormGroup;
  isLoading = false;
  trade_numbers;

  constructor(private tradeNumbersService: TradeNumbersService) {}

  ngOnInit(): void {
    this.getTradeNumbers();

    this.theTradeNumberForm = new FormGroup({
      size_description: new FormControl(null, {}),
      size_code: new FormControl(null, {}),
      type_description: new FormControl(null, {}),
      type_code: new FormControl(null, {}),
      style_description: new FormControl(null, {}),
      style_code: new FormControl(null, {}),
      color_description: new FormControl(null, {}),
      color_code: new FormControl(null, {}),
      season_description: new FormControl(null, {}),
      season_code: new FormControl(null, {}),
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
}
