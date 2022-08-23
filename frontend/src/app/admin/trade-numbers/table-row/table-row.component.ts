import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TableRowService } from './table-row.service';

@Component({
  selector: 'tr[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
})
export class TableRowComponent implements OnInit {
  @Input() data;
  @Input() category;
  @Input() category_style;

  constructor(
    private elementRef: ElementRef,
    private tableRowService: TableRowService
  ) {}

  ngOnInit(): void {
    // console.log({ data: this.data });
    // console.log({ category: this.category });
    // console.log({ style: this.category_style });

    // if the component has been created dynamically
    if (this.data) {
      this.category = this.data.category;
      this.category_style = this.data.category_style;
    }
  }

  updateRow(description: string, code: string) {
    console.log({ description });
    console.log({ code });
    console.log(this.category);
    console.log(this.category_style);
    if (!description || !code) {
      console.log('please provide valid values');
      return;
    }

    //if row pre-existed http request to update from the db
    if (this.category._id) {
      console.log('update row');
      this.tableRowService
        .updateRow(this.category._id, this.category_style, description, code)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
        });
    } else {
      console.log('create row');
      this.tableRowService
        .createRow(this.category_style, description, code)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
        });
    }
  }

  deleteRow() {
    // http request to delete from the db
    this.tableRowService
      .deleteRow(this.category._id, this.category_style)
      .subscribe({
        next: (response) => {
          console.log(response);
          // delete the element from the dom
          this.elementRef.nativeElement.remove();
        },
      });
  }
}
