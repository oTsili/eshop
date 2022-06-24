import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  @Input() spinnerClass: string = 'circle-thick';
  constructor() {}

  ngOnInit(): void {
    // console.log(this.spinnerClass);
  }
}
