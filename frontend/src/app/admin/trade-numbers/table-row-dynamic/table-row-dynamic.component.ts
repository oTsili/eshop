import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row-dynamic.component.html',
  styleUrls: ['./table-row-dynamic.component.scss'],
})
export class TableRowDynamicComponent implements OnInit {
  @Input() data;
  @Input() category;
  ngOnInit(): void {
    console.log({ data: this.data });
    console.log({ category: this.category });

    if (this.data) this.category = this.data.category;
  }

  deleteRow(style) {}
}
