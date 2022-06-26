import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
})
export class ContentListComponent implements OnInit {
  elementList = [
    { text: 'ΧΑΜΗΛΟ (3-5CM)' },
    { text: 'ΜΕΣΑΙ0 (6-9CM)' },
    { text: 'ΨΗΛΟ (10-12CM)' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
