import {
  Component,
  ContentChild,
  ContentChildren,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableRowDirective } from './directives/table-row.directive';
import { TableRow } from './table-row/table-row.interfaces';
import { TradeNumber } from './trade-numbers.interfaces';
import { TradeNumbersService } from './trade-numbers.service';

@Component({
  selector: 'app-trade-numbers',
  templateUrl: './trade-numbers.component.html',
  styleUrls: ['./trade-numbers.component.scss'],
})
export class TradeNumbersComponent implements OnInit {
  style_description = new FormControl('', {});
  style_code = new FormControl('', {});

  typeForm: FormGroup;
  colorForm: FormGroup;
  seasonForm: FormGroup;
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

    this.typeForm = new FormGroup({
      type_description: new FormControl(null, {}),
      type_code: new FormControl(null, {}),
    });
    this.colorForm = new FormGroup({
      color_description: new FormControl(null, {}),
      color_code: new FormControl(null, {}),
    });
    this.seasonForm = new FormGroup({
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
        this.trade_numbers_array = Object.values(response);
        this.trade_number_headers = Object.keys(response);
        console.log(this.trade_numbers_array);
      },
    });
  }

  deleteRow(style) {}
}
