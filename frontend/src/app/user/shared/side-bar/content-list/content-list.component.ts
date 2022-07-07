import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
})
export class ContentListComponent implements OnInit {
  @Input() data: any;
  elementList;
  constructor() {}

  ngOnInit(): void {
    // console.log(this.data);
    this.elementList = this.data.elementList;
  }
}
