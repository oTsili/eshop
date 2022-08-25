import { Component, OnInit } from '@angular/core';
import { TradeNumber } from './trade-numbers.interfaces';
import { TradeNumbersService } from './trade-numbers.service';

@Component({
  selector: 'app-trade-numbers',
  templateUrl: './trade-numbers.component.html',
  styleUrls: ['./trade-numbers.component.scss'],
})
export class TradeNumbersComponent implements OnInit {
  isLoading = false;
  trade_numbers: {
    seasons: TradeNumber[];
    colors: TradeNumber[];
    types: TradeNumber[];
    styles: TradeNumber[];
  };

  trade_numbers_array: TradeNumber[][];
  trade_number_headers: string[];

  constructor(private tradeNumbersService: TradeNumbersService) {}

  ngOnInit(): void {
    this.getTradeNumbers();
  }

  getTradeNumbers() {
    this.tradeNumbersService.getTradeNumbers().subscribe({
      next: (response) => {
        // console.log(response);
        this.trade_numbers = response;
        this.trade_numbers_array = Object.values(response);
        this.trade_number_headers = Object.keys(response);
      },
    });
  }
}
